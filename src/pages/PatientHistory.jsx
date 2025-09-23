import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom"; // Use react-router-dom's Link
import { getHistory } from '../api/mockApi';
import { ArrowLeft, Activity, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

export function PatientHistory() {
  const { bedId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData = await getHistory(bedId);
        setData(historyData);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [bedId]);

  if (loading) {
    return <div className="text-center p-10">Loading Patient History...</div>;
  }
  if (!data) {
    return <div className="text-center p-10">Could not load data for this patient.</div>;
  }

  // --- Data Calculations from your fetched data ---
  const { bed, fluidBag, history } = data;
  const currentLevel = fluidBag.current_level_ml;
  const change24h = history.length > 1 ? currentLevel - history[0].fluid_level : 0;
  
  const getStatusBadge = () => {
    if (currentLevel < fluidBag.threshold_low) return { variant: "destructive", text: "Critical", icon: AlertTriangle };
    if (currentLevel > fluidBag.threshold_high) return { variant: "destructive", text: "Critical High", icon: AlertTriangle };
    return { variant: "default", text: "Normal", icon: Activity };
  };
  const status = getStatusBadge();
  const StatusIcon = status.icon;

  // Format the history data for the chart
  const chartData = history.map(item => ({
      time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      level: item.fluid_level.toFixed(0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild className="gap-2">
          <Link to="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Fluid Level History</h1>
        <p className="text-lg text-muted-foreground">{bed.patient.name} • Bed {bed.bed_number} • {bed.ward.name}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentLevel.toFixed(0)}ml</div>
            <p className="text-xs text-muted-foreground">Target: {fluidBag.capacity_ml}ml</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">24h Change</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${change24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change24h > 0 ? "+" : ""}
              {change24h.toFixed(0)}ml
            </div>
            <p className="text-xs text-muted-foreground">Since this time yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <StatusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Badge variant={status.variant} className="gap-1">
              <StatusIcon className="h-3 w-3" />
              {status.text}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fluid Level Trend (24 Hours)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="level" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default PatientHistory;