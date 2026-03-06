import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Package, DollarSign, Users } from 'lucide-react';

const SellerDashboard = () => {
    return (
        <>
            <Helmet>
                <title>Seller Dashboard - Malasiyakart</title>
            </Helmet>
            <Layout>
                <div className="container-main section-padding">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <DashboardSidebar />

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">RM 15,231.89</div>
                                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+2350</div>
                                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
                                        <Package className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground">+19% from last month</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
                                        <BarChart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">573</div>
                                        <p className="text-xs text-muted-foreground">+201 since last hour</p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground">
                                <p>Detailed analytics and charts coming soon.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SellerDashboard;
