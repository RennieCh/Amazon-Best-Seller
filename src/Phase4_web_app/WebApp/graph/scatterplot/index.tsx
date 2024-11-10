import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductData {
    category: string;
    name: string;
    sale_price: number;
    ratings_count: number;
    sale_price_zscore: number;
    ratings_count_zscore: number;
}

const ScatterPlot: React.FC = () => {
    const [data, setData] = useState<ProductData[]>([]);

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
                const parsedData: ProductData[] = results.data.map((item: any) => ({
                    category: item.category,
                    name: item.name,
                    sale_price: parseFloat(item.sale_price),
                    ratings_count: parseInt(item.ratings_count, 10),
                    sale_price_zscore: parseFloat(item.sale_price_zscore),
                    ratings_count_zscore: parseFloat(item.ratings_count_zscore),
                }));

                setData(parsedData);
            },
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    // Custom tooltip formatter
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { name, sale_price_zscore, ratings_count_zscore } = payload[0].payload;
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ddd' }}>
                    <p><b>Product:</b> {name}</p>
                    <p><b>Sale Price Z-Score:</b> {sale_price_zscore.toFixed(2)}</p>
                    <p><b>Ratings Count Z-Score:</b> {ratings_count_zscore.toFixed(2)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h4 className="text-center mb-4">Product Popularity vs. Pricing (Z-Scores)</h4>
            <ResponsiveContainer width="90%" height={600}>
                <ScatterChart margin={{ top: 20, right: 50, bottom: 50, left: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        type="number"
                        dataKey="sale_price_zscore"
                        name="Sale Price Z-Score"
                        label={{ value: 'Sale Price Z-Score', position: 'bottom', offset: -10 }}
                        tickFormatter={(value) => value.toFixed(2)}
                        domain={[-1, 'dataMax']}
                    />
                    <YAxis
                        type="number"
                        dataKey="ratings_count_zscore"
                        name="Ratings Count Z-Score"
                        label={{ value: 'Ratings Count Z-Score', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => value.toFixed(2)}
                        domain={[-1, 'dataMax']}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                    
                    {/* Adjust the legend position to top-right corner */}
                    <Legend
                        verticalAlign="top"
                        align="right"
                        wrapperStyle={{ paddingBottom: 10 }}
                    />
                    
                    <Scatter
                        name="Product"
                        data={data}
                        fill="#ff7300"
                        shape="circle"
                        stroke="#000"
                        strokeWidth={0.5}
                        opacity={0.7}
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScatterPlot;
