import { Route } from "./+types/AdminDashboardPage";

function loader({request}: Route.LoaderArgs) {
    return {"caralho": "caralho"}
}

export default function AdminDashboardPage() {
    return null;
}
