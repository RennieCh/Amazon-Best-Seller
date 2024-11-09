import RevenueTreemap from "./treemap/revenue";
import RatingsCountTreemap from "./treemap/ratingscount";
import DualAxisChart from "./dual-axis";
import RatingsBarChart from "./horizontalbar/ratingscount";
import RevenueBarChart from "./horizontalbar/revenue";

export default function Graph() {
    return (
        <div className="container-fluid">
            <h2>Graph Placeholder</h2>
            <RevenueTreemap />
            <RatingsCountTreemap />
            <DualAxisChart />
            <RatingsBarChart />
            <RevenueBarChart />

        </div>
    );
}
