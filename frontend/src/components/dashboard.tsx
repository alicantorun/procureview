import React, { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";
import {
    CheckCircle,
    Calendar,
    Briefcase,
    AlertTriangle,
    FileText,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Separator } from "./ui/separator";

// Types
type ImpactCategory = {
    name: string;
    score?: number;
    value?: string;
};

type KeyConcern = {
    issue: string;
    risk_level: number;
    details: string;
    impact: string;
};

type Supplier = {
    name: string;
    country: string;
    city: string;
    spending: number;
    openOrders: number;
};

type DashboardData = {
    date: string;
    region: string;
    overall_risk_level: number;
    impact_categories: ImpactCategory[];
    key_concerns: KeyConcern[];
    recommendations: string[];
    positive_developments: { detail: string; potential_impact: string }[];
    sectors_most_affected: string[];
    suppliers_to_monitor: Supplier[];
    next_assessment_date: string;
    economic_impact: {
        total_spending: number;
        open_orders: number;
        affected_material_group: string;
    };
    ai_news_alert: {
        category: string;
        risk_level: string;
        title: string;
        news_date: string;
        report_date: string;
        content: string[];
        ai_comment: string;
        supplier_info: {
            material_group: string;
            spending: string;
            open_orders: string;
        };
        potential_impacts: string[];
    };
};

// Hardcoded data
const data: DashboardData = {
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
    ai_news_alert: {
        category: "Rubber Category",
        risk_level: "Medium Level",
        title: "Environmental Regulations in Southeast Asia Raise Rubber Prices: Production Contraction Expected",
        news_date: "15 Sep, 2024",
        report_date: "16 Sep, 2024",
        content: [
            "Global raw material markets are facing a major shock from Southeast Asia. Thailand, one of the leading rubber-producing countries along with Malaysia and Indonesia, has drawn attention with new environmental regulations set to take effect in early 2024. While these regulations aim to increase the sustainability of the rubber industry, they bring concerns about significant decreases in production capacity.",
            "The Thai government has introduced strict controls and quotas on natural rubber plantations to prevent the depletion of natural resources and protect biodiversity. Under the new laws, expansion of existing cultivation areas is prohibited, and trees that do not meet certain yield standards are to be removed from the total production area. As a result of these steps, it is estimated that Thailand's rubber production capacity could decrease by up to 20 percent.",
            'Thailand-based rubber giant ThaiRubber Corp. is evaluating the impact of these developments on its operations. In a statement from company officials, it was said, "We acknowledge that the new regulations will provide environmental sustainability in the long term, but in the short term, we may have to significantly reduce our production."',
        ],
        ai_comment:
            "This news addresses the contraction in rubber production due to environmental regulations to be implemented in Southeast Asia and its effect on international rubber prices. In the customer data, Marmara Distributors is listed as the supplier related to rubber:",
        supplier_info: {
            material_group: "Rubber",
            spending: "754.717m EUR",
            open_orders: "None",
        },
        potential_impacts: [
            "Raw Material Shortage or Non-Availability: There may be difficulties in raw material supply.",
            "Product Inventory Shortages: Inventory management may be affected, costs may increase.",
            "Natural Disasters/Regulation Changes: Operations in the sector may be reshaped.",
        ],
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

// Helper components
const RiskLevelBadge: React.FC<{ level: number }> = ({ level }) => {
    const colors = riskLevelColor(level);
    return (
        <Badge className={`${colors.bg} ${colors.text} px-2 py-1 rounded-full`}>
            Risk Level: {level}
        </Badge>
    );
};

const riskLevelColor = (level: number) => {
    if (level <= 3) return { bg: "bg-green-100", text: "text-green-600" };
    if (level <= 6) return { bg: "bg-yellow-100", text: "text-yellow-600" };
    return { bg: "bg-red-100", text: "text-red-600" };
};

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload as ImpactCategory;
        return (
            <div className="bg-white p-2 border rounded shadow">
                <p className="font-bold">{label}</p>
                {item.score !== undefined ? (
                    <p>Score: {item.score}/5</p>
                ) : (
                    <p>Value: {item.value}</p>
                )}
            </div>
        );
    }
    return null;
};

const AINewsAlert: React.FC = () => {
    return (
        <Card className="w-full mx-auto mt-6">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl font-bold">
                        Quibas AI News Alert
                    </CardTitle>
                    <Badge variant="destructive" className="uppercase">
                        New
                    </Badge>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span className="font-medium">
                        {data.ai_news_alert.category}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <Badge variant="secondary">
                        {data.ai_news_alert.risk_level}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold">
                        {data.ai_news_alert.title}
                    </h2>
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                                News Date: {data.ai_news_alert.news_date}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            <span>
                                Report Date: {data.ai_news_alert.report_date}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    {data.ai_news_alert.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <div className="bg-muted p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Quibas AI Comment</h3>
                    <p className="text-sm">{data.ai_news_alert.ai_comment}</p>
                    <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                        <li>
                            Material Group:{" "}
                            {data.ai_news_alert.supplier_info.material_group}
                        </li>
                        <li>
                            Spending Amount:{" "}
                            {data.ai_news_alert.supplier_info.spending}
                        </li>
                        <li>
                            Open Orders:{" "}
                            {data.ai_news_alert.supplier_info.open_orders}
                        </li>
                    </ul>
                    <p className="text-sm mt-2">
                        The effects of the news can be evaluated as follows:
                    </p>
                    <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                        {data.ai_news_alert.potential_impacts.map(
                            (impact, index) => (
                                <li key={index}>{impact}</li>
                            )
                        )}
                    </ol>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-yellow-600">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="font-medium">
                        Risk Assessment Recommended
                    </span>
                </div>
                <Button>Start Risk Assessment</Button>
            </CardFooter>
        </Card>
    );
};

const ImpactCategoryChart: React.FC = () => {
    const chartData = data.impact_categories.map((cat) => ({
        name: cat.name,
        score: cat.score || 0,
        value: cat.value,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                    dataKey="name"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                />
                <YAxis
                    domain={[0, 5]}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" fill="#4F46E5" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
};

const SupplierStatusChart: React.FC = () => (
    <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.suppliers_to_monitor}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
            <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="spending" fill="#6366F1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="openOrders" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

const MTPoD_RTO_Section: React.FC = () => (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>MTPoD and RTO</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">
                        Maximum Tolerable Period of Disruption (MTPoD)
                    </h3>
                    <p>
                        {
                            data.impact_categories.find(
                                (cat) => cat.name === "MTPoD"
                            )?.value
                        }
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">
                        Recovery Time Objective (RTO)
                    </h3>
                    <p>
                        {
                            data.impact_categories.find(
                                (cat) => cat.name === "RTO"
                            )?.value
                        }
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
);

const EvaluationCriteriaSection: React.FC = () => {
    const [selectedCriteria, setSelectedCriteria] = useState(
        evaluationCriteria[0]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Evaluation Criteria</CardTitle>
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
                        {evaluationCriteria.map((criteria, index) => (
                            <SelectItem key={index} value={criteria}>
                                {criteria}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="mt-6 text-gray-700">
                    <h3 className="font-semibold text-lg mb-2">
                        Selected Criteria: {selectedCriteria}
                    </h3>
                    <p className="mb-4">
                        This criteria is evaluated across the impact categories.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {data.impact_categories
                            .filter((cat) => cat.score !== undefined)
                            .map((cat, index) => (
                                <div key={index} className="border p-3 rounded">
                                    <h4 className="font-medium">{cat.name}</h4>
                                    <p>Potential Impact: {cat.score}/5</p>
                                </div>
                            ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const InitiateEvaluationForm: React.FC = () => {
    const [commodity, setCommodity] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Evaluation initiated for commodity: ${commodity}`);
    };

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Initiate Evaluation</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="commodity" className="block mb-2">
                            Commodity Group:
                        </label>
                        <input
                            type="text"
                            id="commodity"
                            value={commodity}
                            onChange={(e) => setCommodity(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <Button type="submit">Start Evaluation</Button>
                </form>
            </CardContent>
        </Card>
    );
};

const AIInsightsSection: React.FC = () => (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>AI-Driven Insights</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-700 mb-4">
                Our AI system has analyzed recent news and market trends. Here
                are the key insights:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                    C&L Aerospace's acquisition of Boeing 737NG parts inventory
                    may impact the Aircraft Components supply chain.
                </li>
                <li>
                    Potential shifts in supplier dynamics, especially concerning
                    Boeing Company and GE Motors.
                </li>
                <li>
                    Possible customs and regulatory challenges due to new parts
                    sourcing from the USA.
                </li>
                <li>
                    Opportunities for cost reduction and improved supply chain
                    resilience due to increased parts availability.
                </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-50 rounded">
                <h4 className="font-semibold mb-2">Recommended Actions:</h4>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Reassess supply strategy for Aircraft Components</li>
                    <li>Evaluate C&L Aerospace as a potential new supplier</li>
                    <li>
                        Monitor customs procedures for parts coming from USA
                    </li>
                    <li>Review open orders with Boeing Company</li>
                </ul>
            </div>
        </CardContent>
    </Card>
);

export const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState("overview");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <main
            className={`flex-1 transition-all duration-200 ease-in-out ${
                isSidebarOpen ? "md:ml-64" : "ml-0"
            }`}
        >
            <div className="px-4 py-6 md:px-8 pt-20">
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
                            <RiskLevelBadge level={data.overall_risk_level} />
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
                        <TabsTrigger value="overview" className="mr-2 mb-2">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="impactCategories"
                            className="mr-2 mb-2"
                        >
                            Impact Categories
                        </TabsTrigger>
                        <TabsTrigger value="keyConcerns" className="mr-2 mb-2">
                            Key Concerns
                        </TabsTrigger>
                        <TabsTrigger value="suppliers" className="mr-2 mb-2">
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
                                    <CardTitle>Sectors Most Affected</CardTitle>
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
                        <AINewsAlert />
                        <AIInsightsSection />
                    </TabsContent>

                    {/* Impact Categories Tab */}
                    <TabsContent value="impactCategories">
                        <Card>
                            <CardHeader>
                                <CardTitle>Impact Categories</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ImpactCategoryChart />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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
                                                            category.score * 20
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
                        <MTPoD_RTO_Section />
                    </TabsContent>

                    {/* Key Concerns Tab */}
                    <TabsContent value="keyConcerns">
                        <Card>
                            <CardHeader>
                                <CardTitle>Key Concerns</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ScrollArea className="h-[500px]">
                                    {data.key_concerns.map((concern, index) => (
                                        <div
                                            key={index}
                                            className="mb-6 p-5 border rounded-lg hover:shadow-lg transition-shadow"
                                        >
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="text-xl font-semibold text-gray-800">
                                                    {concern.issue}
                                                </h3>
                                                <RiskLevelBadge
                                                    level={concern.risk_level}
                                                />
                                            </div>
                                            <p className="text-gray-700 mb-2">
                                                {concern.details}
                                            </p>
                                            <p className="text-gray-700 font-medium">
                                                Impact: {concern.impact}
                                            </p>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Suppliers Tab */}
                    <TabsContent value="suppliers">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Supplier Overview</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <SupplierStatusChart />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Supplier Details</CardTitle>
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
                                                        {supplier.country}
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
                        <EvaluationCriteriaSection />
                        <InitiateEvaluationForm />
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
                                    <span className="text-gray-700">{rec}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Positive Developments Card */}
                <Card className="mt-8 mb-8">
                    <CardHeader>
                        <CardTitle>Positive Developments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {data.positive_developments.map((dev, index) => (
                            <div key={index} className="mb-6">
                                <p className="font-medium text-gray-800">
                                    {dev.detail}
                                </p>
                                <p className="text-gray-700 mt-2">
                                    Potential Impact: {dev.potential_impact}
                                </p>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
};
