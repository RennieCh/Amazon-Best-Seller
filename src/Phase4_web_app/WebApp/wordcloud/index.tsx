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
                const words: WordData[] = results.data
                    .map((item: any) => ({
                        text: item.word,
                        value: parseInt(item.count, 10) + 50, // Adjust value to control font size
                    }))
                    .filter((item: WordData) => !isNaN(item.value))
                    .sort((a: WordData, b: WordData) => b.value - a.value)
                    .slice(0, 250); // Select top 30 words
                setData(words);
            },
        });
    };

    useEffect(() => {
        loadCSV('/database/single_words.csv', setSingleWords);
        loadCSV('/database/pair_words.csv', setPairWords);
        loadCSV('/database/triple_words.csv', setTripleWords);
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Amazon Best Sellers Word Clouds</h3>
            
            {/* Single Words Word Cloud */}
            <div className="row mb-5">
                <div className="col-12">
                    <h5>Single Words</h5>
                    <WordCloud
                        data={singleWords}
                        width={1000}
                        height={600}
                    />
                </div>
            </div>

            {/* Pair Words Word Cloud */}
            <div className="row mb-5">
                <div className="col-12">
                    <h5>Pair Words</h5>
                    <WordCloud
                        data={pairWords}
                        width={1000}
                        height={600}
                    />
                </div>
            </div>

            {/* Triple Words Word Cloud */}
            <div className="row mb-5">
                <div className="col-12">
                    <h5>Triple Words</h5>
                    <WordCloud
                        data={tripleWords}
                        width={1000}
                        height={600}
                    />
                </div>
            </div>
        </div>
    );
};

export default WordCloudComponent;
