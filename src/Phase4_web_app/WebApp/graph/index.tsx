import RevenueTreemap from "./treemap/revenue";
import RatingsCountTreemap from "./treemap/ratingscount";
import DualAxisChart from "./dual-axis";
import RatingsBarChart from "./horizontalbar/ratingscount";
import RevenueBarChart from "./horizontalbar/revenue";
import BestValueBarChart from "./horizontalbar/pricetoquality";
import ScatterPlot from "./scatterplot";


export default function Graph() {
    return (
        <div className="container-fluid">
            <RevenueTreemap />
            <RatingsCountTreemap />
            <DualAxisChart />
            <RatingsBarChart />
            <RevenueBarChart />
            <BestValueBarChart />
            <ScatterPlot />
        </div>
    );
}
