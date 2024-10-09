import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { CheckCircle, Calendar, Briefcase } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";

const data = {
    date: "2024-09-25",
    region: "Global",
    overall_risk_level: 8,
    impact_categories: [
        { name: "Workplace Impact", score: 4 },
        { name: "Legal Impact", score: 3 },
        { name: "Strategic Impact", score: 5 },
        { name: "Financial Impact", score: 5 },
        { name: "Customer Impact", score: 4 },
        { name: "Brand Reputation Impact", score: 3 },
        { name: "Priority Point", score: 4 },
        { name: "MTPoD", value: "7 days" },
        { name: "RTO", value: "3 days" },
    ],
    key_concerns: [
        {
            issue: "Raw Material Shortage",
            risk_level: 9,
            details:
                "C&L Aerospace acquired substantial Boeing 737NG parts inventory",
            impact: "Potential disruption to aircraft components supply chain",
        },
        {
            issue: "Capacity Problems",
            risk_level: 6,
            details: "Increased availability of 737NG parts in the market",
            impact: "Possible alleviation of capacity issues for Boeing and GE Motors",
        },
        {
            issue: "Customs Delays",
            risk_level: 7,
            details: "New parts sourced from USA (C&L Aerospace in Maine)",
            impact: "Potential customs delays for parts coming from new supplier",
        },
        {
            issue: "Productivity Decrease",
            risk_level: 6,
            details: "Possible decrease in Boeing's production capacity",
            impact: "May necessitate evaluation of alternative suppliers",
        },
        {
            issue: "Regulation Changes",
            risk_level: 5,
            details: "Potential changes in regulations between USA and Turkey",
            impact: "May affect import/export procedures for aircraft parts",
        },
    ],
    recommendations: [
        "Reassess supply strategy for Aircraft Components",
        "Evaluate C&L Aerospace as a potential new supplier",
        "Monitor customs procedures for parts coming from USA",
        "Review open orders with Boeing Company",
        "Assess impact on GE Motors supply chain",
    ],
    positive_developments: [
        {
            detail: "Increased availability of Boeing 737NG parts",
            potential_impact:
                "Could lead to lower costs and improved supply chain resilience",
        },
    ],
    sectors_most_affected: [
        "Aircraft Components",
        "Aerospace Manufacturing",
        "Airlines",
    ],
    suppliers_to_monitor: [
        {
            name: "Boeing Company",
            country: "USA",
            city: "Florida",
            spending: 73000000,
            openOrders: 12000000,
        },
        {
            name: "GE Motors",
            country: "USA",
            city: "Texas",
            spending: 12000000,
            openOrders: 0,
        },
        {
            name: "C&L Aerospace",
            country: "USA",
            city: "Maine",
            spending: 0,
            openOrders: 0,
        },
    ],
    next_assessment_date: "2024-09-26",
    economic_impact: {
        total_spending: 85000000,
        open_orders: 12000000,
        affected_material_group: "Aircraft Components",
    },
};

const evaluationCriteria = [
    "Raw Material Shortage or Non-Availability",
    "Energy Shortage at Supplier",
    "Communication/Infrastructure Problems",
    "Sub-Supplier Problems",
    "Natural Disasters",
    "Terrorist Attacks/Activities",
    "Mergers, Acquisitions at Suppliers",
    "Management Changes at Suppliers",
    "Productivity Decrease",
    "Quality Problems",
    "Fire at Premises",
    "Strike/Workers Unrest",
    "Product Inventory Shortages",
    "Capacity Problems",
    "Machine Breakdown",
    "Financial Unhealth of Supplier",
    "ESG Issues at Suppliers",
    "Data Protection Violation by Suppliers",
    "Cyberattacks to Suppliers or SC",
    "Air Transport Disruptions",
    "Road Transport Disruptions",
    "Sea Transport Disruptions",
    "Rail Transport Disruptions",
    "Customs Delays",
    "Regulation Changes",
    "Customs Tariffs",
    "SXS/3PL Damage to Inventory",
    "SXS/3PL Inventory Obsolescence",
];

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [selectedCriteria, setSelectedCriteria] = useState(
        evaluationCriteria[0]
    );
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const riskLevelColor = (level: any) => {
        if (level <= 3) return { bg: "bg-green-100", text: "text-green-600" };
        if (level <= 6) return { bg: "bg-yellow-100", text: "text-yellow-600" };
        return { bg: "bg-red-100", text: "text-red-600" };
    };

    const RiskLevelBadge = ({ level }: any) => {
        const colors = riskLevelColor(level);
        return (
            <Badge
                className={`${colors.bg} ${colors.text} px-2 py-1 rounded-full`}
            >
                Risk Level: {level}
            </Badge>
        );
    };

    const ImpactCategoryChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data.impact_categories.filter(
                    (cat) => cat.score !== undefined
                )}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis
                    domain={[0, 5]}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );

    const SupplierStatusChart = () => (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.suppliers_to_monitor}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="spending" fill="#6366F1" radius={[4, 4, 0, 0]} />
                <Bar
                    dataKey="openOrders"
                    fill="#10B981"
                    radius={[4, 4, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header toggleSidebar={toggleSidebar} />
            <div className="flex flex-1 pt-16">
                {" "}
                {/* Add pt-16 to account for the fixed header */}
                <Sidebar isOpen={isSidebarOpen} />
                <main
                    className={`flex-1 transition-all duration-200 ease-in-out ${
                        isSidebarOpen ? "md:ml-64" : "ml-0"
                    }`}
                >
                    <div className="px-4 py-6 md:px-8">
                        <h1 className="text-2xl font-bold mb-6">
                            Aircraft Components Procurement Risk Dashboard
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Overall Risk Level Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Overall Risk Level</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-5xl font-extrabold mb-4 text-gray-800">
                                        {data.overall_risk_level}/10
                                    </div>
                                    <Progress
                                        value={data.overall_risk_level * 10}
                                        className="w-full h-4 rounded-full bg-gray-200"
                                    />
                                </CardContent>
                                <CardFooter>
                                    <RiskLevelBadge
                                        level={data.overall_risk_level}
                                    />
                                </CardFooter>
                            </Card>

                            {/* Economic Impact Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Economic Impact</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4 text-gray-700">
                                        <div className="flex justify-between items-center">
                                            <span>Total Spending</span>
                                            <span className="font-bold">
                                                {data.economic_impact.total_spending.toLocaleString()}{" "}
                                                EUR
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Open Orders</span>
                                            <span className="font-bold text-yellow-600">
                                                {data.economic_impact.open_orders.toLocaleString()}{" "}
                                                EUR
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Affected Material Group</span>
                                            <span className="font-bold">
                                                {
                                                    data.economic_impact
                                                        .affected_material_group
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Next Assessment Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Next Assessment</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col items-center justify-center space-y-2">
                                        <Calendar className="h-8 w-8 text-blue-600" />
                                        <span className="text-2xl font-bold text-gray-800">
                                            {data.next_assessment_date}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Tabs */}
                        <Tabs
                            value={selectedTab}
                            onValueChange={setSelectedTab}
                            className="space-y-6"
                        >
                            <TabsList className="flex flex-wrap">
                                <TabsTrigger
                                    value="overview"
                                    className="mr-2 mb-2"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="impactCategories"
                                    className="mr-2 mb-2"
                                >
                                    Impact Categories
                                </TabsTrigger>
                                <TabsTrigger
                                    value="keyConcerns"
                                    className="mr-2 mb-2"
                                >
                                    Key Concerns
                                </TabsTrigger>
                                <TabsTrigger
                                    value="suppliers"
                                    className="mr-2 mb-2"
                                >
                                    Suppliers
                                </TabsTrigger>
                                <TabsTrigger
                                    value="evaluationCriteria"
                                    className="mr-2 mb-2"
                                >
                                    Evaluation Criteria
                                </TabsTrigger>
                            </TabsList>

                            {/* Overview Tab */}
                            <TabsContent value="overview">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Impact Categories Overview
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ImpactCategoryChart />
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Sectors Most Affected
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ul className="space-y-3">
                                                {data.sectors_most_affected.map(
                                                    (sector, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <Briefcase className="h-6 w-6 text-blue-600" />
                                                            <span className="text-lg text-gray-700">
                                                                {sector}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Impact Categories Tab */}
                            <TabsContent value="impactCategories">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Impact Categories</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {data.impact_categories.map(
                                                (category, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-4 border rounded-lg hover:shadow-lg transition-shadow"
                                                    >
                                                        <h3 className="font-semibold text-gray-800">
                                                            {category.name}
                                                        </h3>
                                                        {category.score !==
                                                        undefined ? (
                                                            <Progress
                                                                value={
                                                                    category.score *
                                                                    20
                                                                }
                                                                className="mt-3 h-3 rounded-full bg-gray-200"
                                                            />
                                                        ) : (
                                                            <p className="mt-3 text-gray-600">
                                                                {category.value}
                                                            </p>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Key Concerns Tab */}
                            <TabsContent value="keyConcerns">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Key Concerns</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ScrollArea className="h-[500px]">
                                            {data.key_concerns.map(
                                                (concern, index) => (
                                                    <div
                                                        key={index}
                                                        className="mb-6 p-5 border rounded-lg hover:shadow-lg transition-shadow"
                                                    >
                                                        <div className="flex justify-between items-center mb-3">
                                                            <h3 className="text-xl font-semibold text-gray-800">
                                                                {concern.issue}
                                                            </h3>
                                                            <RiskLevelBadge
                                                                level={
                                                                    concern.risk_level
                                                                }
                                                            />
                                                        </div>
                                                        <p className="text-gray-700 mb-2">
                                                            {concern.details}
                                                        </p>
                                                        <p className="text-gray-700 font-medium">
                                                            Impact:{" "}
                                                            {concern.impact}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </ScrollArea>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Suppliers Tab */}
                            <TabsContent value="suppliers">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Supplier Overview
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <SupplierStatusChart />
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>
                                                Supplier Details
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ScrollArea className="h-[500px]">
                                                {data.suppliers_to_monitor.map(
                                                    (supplier, index) => (
                                                        <div
                                                            key={index}
                                                            className="mb-6 p-5 border rounded-lg hover:shadow-lg transition-shadow"
                                                        >
                                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                                {supplier.name}
                                                            </h3>
                                                            <p className="text-gray-700 mb-1">
                                                                Location:{" "}
                                                                {supplier.city},{" "}
                                                                {
                                                                    supplier.country
                                                                }
                                                            </p>
                                                            <p className="text-gray-700 mb-1">
                                                                Total Spending:{" "}
                                                                {supplier.spending.toLocaleString()}{" "}
                                                                EUR
                                                            </p>
                                                            <p className="text-gray-700">
                                                                Open Orders:{" "}
                                                                {supplier.openOrders.toLocaleString()}{" "}
                                                                EUR
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </ScrollArea>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Evaluation Criteria Tab */}
                            <TabsContent value="evaluationCriteria">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Evaluation Criteria
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Select
                                            onValueChange={setSelectedCriteria}
                                            defaultValue={selectedCriteria}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a criteria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {evaluationCriteria.map(
                                                    (criteria, index) => (
                                                        <SelectItem
                                                            key={index}
                                                            value={criteria}
                                                        >
                                                            {criteria}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <div className="mt-6 text-gray-700">
                                            <h3 className="font-semibold text-lg">
                                                Selected Criteria:{" "}
                                                {selectedCriteria}
                                            </h3>
                                            <p className="mt-3">
                                                This criteria is evaluated
                                                across the impact categories.
                                                Use the dropdown to select
                                                different criteria and assess
                                                their potential impact on the
                                                supply chain.
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Recommendations Card */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {data.recommendations.map((rec, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start space-x-3"
                                        >
                                            <CheckCircle className="h-6 w-6 text-green-600 mt-1" />
                                            <span className="text-gray-700">
                                                {rec}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Positive Developments Card */}
                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle>Positive Developments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {data.positive_developments.map(
                                    (dev, index) => (
                                        <div key={index} className="mb-6">
                                            <p className="font-medium text-gray-800">
                                                {dev.detail}
                                            </p>
                                            <p className="text-gray-700 mt-2">
                                                Potential Impact:{" "}
                                                {dev.potential_impact}
                                            </p>
                                        </div>
                                    )
                                )}
                            </CardContent>
                        </Card>

                        {/* AI-Driven Insights Card */}
                        <Card className="mt-8 mb-8">
                            <CardHeader>
                                <CardTitle>AI-Driven Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700">
                                    This dashboard is powered by AI analysis of
                                    daily news sources relevant to the supply
                                    chain. Key findings:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700">
                                    <li>
                                        C&L Aerospace's acquisition of Boeing
                                        737NG parts inventory may impact the
                                        Aircraft Components supply chain.
                                    </li>
                                    <li>
                                        Potential shifts in supplier dynamics,
                                        especially concerning Boeing Company and
                                        GE Motors.
                                    </li>
                                    <li>
                                        Possible customs and regulatory
                                        challenges due to new parts sourcing
                                        from the USA.
                                    </li>
                                    <li>
                                        Opportunities for cost reduction and
                                        improved supply chain resilience due to
                                        increased parts availability.
                                    </li>
                                </ul>
                                <p className="mt-6 text-gray-700">
                                    The AI system continually monitors news
                                    sources and updates this dashboard, alerting
                                    relevant stakeholders to potential risks and
                                    opportunities in the supply chain.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
