import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import 'datatables.net';
import 'datatables.net-bs5';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { FaSort } from 'react-icons/fa';

interface Product {
    rank: number;
    name: string;
    ratings_count: number;
    rating: number;
    sale_price: number;
    category: string;
    product_url: string;
}

const TableComponent: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);

    const loadCSV = () => {
        console.log("Fetching CSV from public folder...");
        fetch('/database/amazon_bestseller.csv')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then((csvData) => {
                Papa.parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        console.log("CSV parsed successfully:", results.data.length, "records loaded");
                        setData(results.data as Product[]);
                    },
                });
            })
            .catch((error) => console.error("Error fetching or parsing CSV:", error));
    };

    useEffect(() => {
        loadCSV();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            console.log(`Initializing DataTable with ${data.length} records...`);
            const table = $('#datatable').DataTable({
                responsive: true,
                paging: true,
                pageLength: 100,
                lengthMenu: [10, 25, 50, 100, 250, 500, 1000],
                searching: true,
                ordering: true,
                destroy: true,
            } as any);

            return () => {
                table.destroy();
            };
        }
    }, [data]);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Amazon Best Sellers Data Retrieved on 10/16/2024</h3>
            <div className="table-responsive">
                <table id="datatable" className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '7%', textAlign: 'center' }}>
                                Rank <FaSort className="float-end align-center" />
                            </th>
                            <th style={{ width: '30%' }}>
                                Name <FaSort className="float-end" />
                            </th>
                            <th style={{ width: '10%', textAlign: 'center' }}>
                                Ratings Count <FaSort className="float-end" />
                            </th>
                            <th style={{ width: '8%', textAlign: 'center' }}>
                                Rating <FaSort className="float-end" />
                            </th>
                            <th style={{ width: '10%', textAlign: 'center' }}>
                                Sale Price <FaSort className="float-end" />
                            </th>
                            <th style={{ width: '15%' }}>
                                Category <FaSort className="float-end" />
                            </th>
                            <th style={{ width: '10%', textAlign: 'center' }}>
                                Product URL <FaSort className="float-end" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr key={index}>
                                <td className="text-center">{product.rank}</td>
                                <td style={{ whiteSpace: 'normal' }}>{product.name}</td>
                                <td className="text-center">{product.ratings_count}</td>
                                <td className="text-center">{product.rating}</td>
                                <td className="text-center">${product.sale_price}</td>
                                <td>{product.category}</td>
                                <td className="text-center">
                                    <a href={product.product_url} target="_blank" rel="noopener noreferrer">
                                        View Product
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;
