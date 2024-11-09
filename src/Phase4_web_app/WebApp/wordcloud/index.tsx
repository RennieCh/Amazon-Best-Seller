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
                    .slice(0, 250);
                setData(words);
            },
        });
    };

    useEffect(() => {
        loadCSV('/database/single_words.csv', setSingleWords);
        loadCSV('/database/pair_words.csv', setPairWords);
        loadCSV('/database/triple_words.csv', setTripleWords);
    }, []);

    const fontSizeMapper = (word: WordData, index: number) => {
        const baseFontSize = Math.log2(word.value) * 10;
        return index < 10 ? baseFontSize * 1.5 : baseFontSize;
    };

    const renderWordCloud = (data: WordData[]) => (
        <WordCloud
            data={data}
            width={1200}
            height={600}
            fontWeight="bold"
            font={(word) => 'Arial'}
            fontSize={fontSizeMapper}
            rotate={() => 0}
        />
    );

    // Disable automatic carousel movement
    useEffect(() => {
        const bootstrap = require('bootstrap');
        const carouselElement = document.getElementById('wordCloudCarousel');
        if (carouselElement) {
            new bootstrap.Carousel(carouselElement, {
                interval: false, // Disable auto slide
                ride: false,
            });
        }
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Best Sellers' Title Word Clouds</h2>

            {/* Carousel and Buttons in a Row */}
            <div className="row align-items-center">
                {/* Previous Button (13% width) */}
                <div className="col-1 d-flex justify-content-center">
                    <button
                        className="btn btn-dark"
                        type="button"
                        data-bs-target="#wordCloudCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                </div>

                {/* Carousel taking full width (70% width) */}
                <div className="col-10">
                    <div id="wordCloudCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {/* Single Words Word Cloud */}
                            <div className="carousel-item active">
                                {renderWordCloud(singleWords)}
                                <div className="carousel-caption">
                                    <h5 className='bg-secondary'>Single Words</h5>
                                </div>
                            </div>

                            {/* Pair Words Word Cloud */}
                            <div className="carousel-item">
                                {renderWordCloud(pairWords)}
                                <div className="carousel-caption">
                                    <h5 className='bg-secondary'>Pair Words</h5>
                                </div>
                            </div>

                            {/* Triple Words Word Cloud */}
                            <div className="carousel-item">
                                {renderWordCloud(tripleWords)}
                                <div className="carousel-caption">
                                    <h5 className='bg-secondary'>Triple Words</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Button (13% width) */}
                <div className="col-1 d-flex justify-content-center">
                    <button
                        className="btn btn-dark"
                        type="button"
                        data-bs-target="#wordCloudCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WordCloudComponent;
