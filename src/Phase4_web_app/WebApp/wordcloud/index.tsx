import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import WordCloud from 'react-d3-cloud';
import 'bootstrap/dist/css/bootstrap.min.css';

interface WordData {
    text: string;
    value: number;
}

const WordCloudComponent: React.FC = () => {
    const [singleWords, setSingleWords] = useState<WordData[]>([]);
    const [pairWords, setPairWords] = useState<WordData[]>([]);
    const [tripleWords, setTripleWords] = useState<WordData[]>([]);

    // Function to load CSV and parse it
    const loadCSV = async (filePath: string, setData: React.Dispatch<React.SetStateAction<WordData[]>>) => {
        const response = await fetch(filePath);
        const reader = response.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder('utf-8');
        const csv = decoder.decode(result?.value);

        Papa.parse(csv, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const words = results.data
                    .map((item: any) => ({
                        text: item.word,
                        value: parseInt(item.count, 10),
                    }))
                    .filter((item: WordData) => !isNaN(item.value))
                    .sort((a: WordData, b: WordData) => b.value - a.value)
                    .slice(0, 250); // Select top 250 words

                setData(words);
            },
        });
    };

    useEffect(() => {
        loadCSV('/database/single_words.csv', setSingleWords);
        loadCSV('/database/pair_words.csv', setPairWords);
        loadCSV('/database/triple_words.csv', setTripleWords);
    }, []);

    // Custom font size mapper
    const fontSizeMapper = (word: WordData, index: number) => {
        return index < 10 ? word.value * 1.5 : word.value * 1; // Larger size for top 10
    };

    const renderWordCloud = (data: WordData[]) => (
        <WordCloud
            data={data}
            width={1000}
            height={600}
            fontWeight="bold"
            font={(word) => 'Arial'}
            fontSize={fontSizeMapper}
            rotate={() => 0} // No rotation
        />
    );

    useEffect(() => {
        const bootstrap = require('bootstrap');
        const carouselElement = document.getElementById('wordCloudCarousel');
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: 3000,
                ride: 'carousel',
            });
        }
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">Amazon Best Sellers Word Clouds</h3>

            <div id="wordCloudCarousel" className="carousel slide" data-bs-ride="carousel" style={{ position: 'relative' }}>
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#wordCloudCarousel" data-bs-slide-to="0" className="active" aria-label="Single Words"></button>
                    <button type="button" data-bs-target="#wordCloudCarousel" data-bs-slide-to="1" aria-label="Pair Words"></button>
                    <button type="button" data-bs-target="#wordCloudCarousel" data-bs-slide-to="2" aria-label="Triple Words"></button>
                </div>

                {/* Carousel Inner */}
                <div className="carousel-inner">
                    {/* Single Words Word Cloud */}
                    <div className="carousel-item active">
                        {renderWordCloud(singleWords)}
                    </div>
                    {/* Pair Words Word Cloud */}
                    <div className="carousel-item">
                        {renderWordCloud(pairWords)}
                    </div>
                    {/* Triple Words Word Cloud */}
                    <div className="carousel-item">
                        {renderWordCloud(tripleWords)}
                    </div>
                </div>

                {/* Previous Button */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#wordCloudCarousel"
                    data-bs-slide="prev"
                    style={{
                        position: 'absolute',
                        bottom: '50px', // Adjust this value to move the button lower
                        left: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                    }}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                {/* Next Button */}
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#wordCloudCarousel"
                    data-bs-slide="next"
                    style={{
                        position: 'absolute',
                        bottom: '50px', // Adjust this value to move the button lower
                        right: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        borderRadius: '50%',
                    }}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" style={{ filter: 'invert(1)' }}></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

        </div>
    );
};

export default WordCloudComponent;
