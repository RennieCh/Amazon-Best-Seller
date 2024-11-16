import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProductData {
    category: string;
    name: string;
    ratings_count: number;
    price_to_quality_ratio: number;
    image: string;
}

const BestValueBarChart: React.FC = () => {
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
                    price_to_quality_ratio: parseFloat(item.price_to_quality_ratio),
                    image: item.image,
                }));

                // Filter out products with ratings_count = 0 or price_to_quality_ratio = 0
                const filteredData = parsedData.filter(
                    (item) => item.ratings_count > 0 && item.price_to_quality_ratio > 0
                );

                // Sort by price_to_quality_ratio in ascending order
                const sortedData = filteredData.sort((a, b) => a.price_to_quality_ratio - b.price_to_quality_ratio);

                const uniqueCategories = Array.from(new Set(filteredData.map(d => d.category)));
                setCategories(['All', ...uniqueCategories]);

                setData(sortedData);
                setFilteredData(sortedData.slice(0, 10)); // Show Top 10 products by default
            },
        });
    };

    useEffect(() => {
        loadCSV();
    }, []);

    // Filter data based on selected category
    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredData(data.slice(0, 10)); // Show Top 10 products overall
        } else {
            const filtered = data
                .filter(d => d.category === selectedCategory)
                .sort((a, b) => a.price_to_quality_ratio - b.price_to_quality_ratio)
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
            <h4 className="text-center mb-4">Top 10 Products by Price to Quality Ratio</h4>
            <div className="d-flex justify-content-center mb-4">
                <select value={selectedCategory} onChange={handleCategoryChange} className="form-select w-60">
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
                        <XAxis type="number" tickFormatter={(value) => `${value.toFixed(2)}`} />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={<CustomYAxisTick />}
                            width={100}
                        />
                        <Tooltip formatter={(value: any) => `${value.toFixed(2)}`} />
                        <Bar dataKey="price_to_quality_ratio" fill="#6a0dad" barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BestValueBarChart;
