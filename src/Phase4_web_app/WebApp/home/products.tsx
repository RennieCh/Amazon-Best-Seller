import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductData {
    asin: string;
    sale_price: number;
    ratings_count: number;
    rating: number;
    image: string;
}

const RandomScatterPlot: React.FC = () => {
    const [data, setData] = useState<ProductData[]>([]);

    // Function to load CSV data
    const loadCSV = async () => {
        const response = await fetch(process.env.PUBLIC_URL + '/database/amazon_bestseller.csv');
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result?.value);

        Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const parsedData: ProductData[] = results.data.map((item: any) => ({
                    asin: item.asin,
                    sale_price: parseFloat(item.sale_price),
                    ratings_count: parseInt(item.ratings_count, 10),
                    rating: parseFloat(item.rating),
                    image: item.image,
                }));

                // Filter and map top 200 products with random coordinates
                const filteredData = parsedData
                    .filter(product => product.image && !isNaN(product.sale_price) && !isNaN(product.rating))
                    .sort((a, b) => b.ratings_count - a.ratings_count)
                    .slice(0, 200)
                    .map(product => ({
                        ...product,
                        x: Math.random() * 100,
                        y: Math.random() * 100,
                    }));

                setData(filteredData);
            },
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56'];

    // Custom Tooltip Component with improved styling
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { asin, sale_price, ratings_count, rating, image } = payload[0].payload;
            return (
                <div
                    style={{
                        backgroundColor: '#343a40',
                        padding: '12px',
                        border: '1px solid #ccc',
                        maxWidth: '220px',
                        borderRadius: '8px',
                        color: '#f8f9fa',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={image}
                        alt={asin}
                        width="70"
                        height="70"
                        style={{ objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }}
                    />
                    <p
                        style={{
                            fontSize: '13px',
                            fontWeight: 'bold',
                            marginBottom: '6px',
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                        title={asin}
                    >
                        ASIN: {asin}
                    </p>
                    <p style={{ margin: 0, fontSize: '12px' }}>Price: ${sale_price.toFixed(2)}</p>
                    <p style={{ margin: 0, fontSize: '12px' }}>Rating: {rating} ⭐</p>
                    <p style={{ margin: 0, fontSize: '12px' }}>Ratings Count: {ratings_count}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="container mt-5">
            <div style={{ width: '100%', height: '360px' }}>
                <ResponsiveContainer>
                    <ScatterChart width={800} height={360} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <XAxis type="number" dataKey="x" hide />
                        <YAxis type="number" dataKey="y" hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                        <Scatter name="Products" data={data} shape="circle">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RandomScatterPlot;
