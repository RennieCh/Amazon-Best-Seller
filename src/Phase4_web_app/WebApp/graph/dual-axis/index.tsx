import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CategoryData {
    category: string;
    ratings_count: number;
    estimated_revenue: number;
}

const DualAxisChart: React.FC = () => {
    const [data, setData] = useState<CategoryData[]>([]);

    // Function to load CSV data
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
                const parsedData: CategoryData[] = results.data.map((item: any) => ({
                    category: item.category,
                    ratings_count: parseInt(item.ratings_count, 10),
                    estimated_revenue: parseFloat(item.estimated_revenue)
                }));

                const groupedData: { [key: string]: CategoryData } = parsedData.reduce((acc, curr) => {
                    if (!acc[curr.category]) {
                        acc[curr.category] = { category: curr.category, ratings_count: 0, estimated_revenue: 0 };
                    }
                    acc[curr.category].ratings_count += curr.ratings_count;
                    acc[curr.category].estimated_revenue += curr.estimated_revenue;
                    return acc;
                }, {} as Record<string, CategoryData>);

                let categories = Object.values(groupedData)
                    .sort((a, b) => b.estimated_revenue - a.estimated_revenue);

                // Show all 36 categories
                categories = categories.slice(0, 36);

                setData(categories);
            }
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    useEffect(() => {
        if (data.length === 0) return;

        // Adjusted margins and size for a more compact chart
        const margin = { top: 40, right: 50, bottom: 110, left: 60 };
        const width = 900 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        d3.select('#dual-axis-chart').select('svg').remove();

        const svg = d3
            .select('#dual-axis-chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3
            .scaleBand()
            .domain(data.map(d => d.category))
            .range([0, width])
            .padding(0.1);

        const yScaleLeft = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.ratings_count) || 0])
            .range([height, 0])
            .nice();

        const yScaleRight = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => d.estimated_revenue) || 0])
            .range([height, 0])
            .nice();

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.category)!)
            .attr('y', d => yScaleLeft(d.ratings_count))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScaleLeft(d.ratings_count))
            .attr('fill', 'skyblue')
            .attr('stroke', 'black');

        svg.append('g')
            .call(d3.axisLeft(yScaleLeft).tickFormat(d => `${(d as number) / 1000}K`))
            .attr('font-size', '10px')
            .append('text')
            .attr('x', 80)
            .attr('y', -20)
            .attr('fill', 'blue')
            .attr('text-anchor', 'end')
            .text('Ratings Count (in Thousands)');

        const line = d3
            .line<CategoryData>()
            .x(d => xScale(d.category)! + xScale.bandwidth() / 2)
            .y(d => yScaleRight(d.estimated_revenue));

        svg.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', 'red')
            .attr('stroke-width', 2)
            .attr('d', line);

        svg.append('g')
            .attr('transform', `translate(${width},0)`)
            .call(d3.axisRight(yScaleRight).tickFormat(d => `${(d as number) / 1000}K`))
            .attr('font-size', '10px')
            .append('text')
            .attr('x', 30)
            .attr('y', -10)
            .attr('fill', 'red')
            .attr('text-anchor', 'end')
            .text('Estimated Revenue (in Thousands)');

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end')
            .style('font-size', '9px');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -20)
            .attr('text-anchor', 'middle')
            .style('font-size', '16px')
            .style('font-weight', 'bold')
    }, [data]);

    return (
        <div className="container mt-5">
            <h4 className="text-center">Categories by Ratings Count and Estimated Revenue</h4>
            <div id="dual-axis-chart" className="d-flex justify-content-center" />
        </div>
    );
};

export default DualAxisChart;
