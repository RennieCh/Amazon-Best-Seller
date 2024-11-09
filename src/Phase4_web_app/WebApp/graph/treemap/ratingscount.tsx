import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';

interface RatingsData {
    category: string;
    ratings_count: number;
}

interface TreemapNode {
    name: string;
    value: number;
    children?: TreemapNode[];
}

interface TreemapProps {
    data: TreemapNode;
    width: number;
    height: number;
}

// Define a new set of colors for the ratings count treemap
const ratingsColors = [
    "#e74c3c", "#3498db", "#9b59b6", "#2ecc71",
    "#f1c40f", "#e67e22", "#1abc9c", "#34495e",
    "#8e44ad", "#c0392b", "#16a085", "#f39c12",
    "#27ae60", "#d35400", "#7f8c8d", "#95a5a6"
];

// Treemap component with hover effect
const Treemap: React.FC<TreemapProps> = ({ data, width, height }) => {
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // Generate hierarchy from the data
    const hierarchy = useMemo(() => {
        return d3.hierarchy(data)
            .sum(d => Math.log2(d.value + 1)) // Apply logarithmic scaling for better distribution
            .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
    }, [data]);

    const colorScale = d3.scaleOrdinal(ratingsColors);

    const root = useMemo(() => {
        const treemapGenerator = d3.treemap<TreemapNode>()
            .size([width, height])
            .paddingInner(3)
            .round(true);
        return treemapGenerator(hierarchy);
    }, [hierarchy, width, height]);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <svg width={width} height={height} style={{ border: '1px solid #ccc', maxWidth: '100%' }}>
                {root.leaves().map((node, index) => {
                    const nodeWidth = node.x1 - node.x0;
                    const nodeHeight = node.y1 - node.y0;
                    const fontSize = Math.min(14, Math.max(8, nodeWidth / 12));
                    const fillColor = colorScale(node.depth.toString());

                    // Determine opacity based on hover state
                    const isHovered = hoveredNode === node.data.name;
                    const opacity = hoveredNode ? (isHovered ? 1 : 0.3) : 0.9;

                    return (
                        <g
                            key={index}
                            transform={`translate(${node.x0},${node.y0})`}
                            onMouseEnter={() => setHoveredNode(node.data.name)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <rect
                                width={nodeWidth}
                                height={nodeHeight}
                                fill={fillColor}
                                stroke="#fff"
                                style={{ opacity }}
                            />
                            {nodeWidth > 30 && nodeHeight > 20 && (
                                <text
                                    x={4}
                                    y={16}
                                    fontSize={fontSize}
                                    fill="white"
                                    fontWeight="bold"
                                    textAnchor="start"
                                    alignmentBaseline="hanging"
                                >
                                    {node.data.name}
                                </text>
                            )}
                            {nodeWidth > 30 && nodeHeight > 35 && (
                                <text
                                    x={4}
                                    y={32}
                                    fontSize={Math.max(8, fontSize - 2)}
                                    fill="white"
                                    textAnchor="start"
                                    alignmentBaseline="hanging"
                                >
                                    {Math.round(node.data.value).toLocaleString()} ratings
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

const RatingsCountTreemap: React.FC = () => {
    const [data, setData] = useState<TreemapNode | null>(null);

    // Load CSV data and parse it into the treemap format
    const loadCSV = async () => {
        const response = await fetch('/database/amazon_bestseller.csv');
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result?.value);

        Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedData: RatingsData[] = results.data.map((item: any) => ({
                    category: item.category,
                    ratings_count: parseInt(item.ratings_count, 10),
                }));

                const groupedData: { [key: string]: number } = parsedData.reduce(
                    (acc, curr) => {
                        acc[curr.category] = (acc[curr.category] || 0) + curr.ratings_count;
                        return acc;
                    },
                    {} as { [key: string]: number }
                );

                let children = Object.entries(groupedData)
                    .map(([key, value]) => ({ name: key, value }))
                    .sort((a, b) => b.value - a.value);

                // Keep top 36 categories
                children = children.slice(0, 36);

                const totalValue = children.reduce((sum, node) => sum + node.value, 0);

                const treemapData: TreemapNode = {
                    name: 'Ratings Count',
                    value: totalValue,
                    children,
                };

                setData(treemapData);
            },
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Categories by Ratings Count</h2>
            {data && <Treemap data={data} width={800} height={600} />}
        </div>
    );
};

export default RatingsCountTreemap;
