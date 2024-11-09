import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductData {
    category: string;
    name: string;
    ratings_count: number;
    estimated_revenue: number;
    image: string;
}

const RevenueBarChart: React.FC = () => {
    const [data, setData] = useState<ProductData[]>([]);
    const [filteredData, setFilteredData] = useState<ProductData[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
                    ratings_count: parseInt(item.ratings_count, 10),
                    estimated_revenue: parseFloat(item.estimated_revenue),
                    image: item.image,
                }));

                // Sort by estimated revenue
                const sortedData = parsedData.sort((a, b) => b.estimated_revenue - a.estimated_revenue);

                const uniqueCategories = Array.from(new Set(parsedData.map(d => d.category)));
                setCategories(['All', ...uniqueCategories]);

                setData(sortedData);
                setFilteredData(sortedData.slice(0, 10)); // Show top 10 products by default
            },
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredData(data.slice(0, 10));
        } else {
            const filtered = data
                .filter(d => d.category === selectedCategory)
                .sort((a, b) => b.estimated_revenue - a.estimated_revenue)
                .slice(0, 10);
            setFilteredData(filtered);
        }
    }, [selectedCategory, data]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    // Custom tick component for rendering images
    const CustomYAxisTick: React.FC<any> = ({ x, y, payload }) => {
        const product = filteredData[payload.index];
        return (
            <foreignObject x={x - 60} y={y - 30} width={60} height={60}>
                <img 
                    src={product?.image} 
                    alt={product?.name} 
                    width="60" 
                    height="60" 
                    style={{ objectFit: 'cover', borderRadius: '8px' }} 
                />
            </foreignObject>
        );
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <h4 className="text-center mb-4">Top 10 Products by Estimated Revenue</h4>
            <div className="d-flex justify-content-center mb-4">
                <select value={selectedCategory} onChange={handleCategoryChange} className="form-select w-70">
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div style={{ width: '90%', maxWidth: '1200px' }}>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart
                        layout="vertical"
                        data={filteredData}
                        margin={{ top: 20, right: 30, bottom: 20, left: 60 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={<CustomYAxisTick />}
                            width={100}
                        />
                        <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                        <Bar dataKey="estimated_revenue" fill="#ff7f0e" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default RevenueBarChart;
