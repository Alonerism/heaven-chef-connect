import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, DollarSign, Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Job = Tables<"jobs">;

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    checkAuth();
    fetchJobs();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile) {
      setUserRole(profile.role);
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading jobs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Available Jobs</h1>
            <p className="text-muted-foreground">Browse and bid on exciting chef opportunities</p>
          </div>
          {userRole === "customer" && (
            <Button onClick={() => navigate("/jobs/new")}>
              <Plus className="mr-2 h-4 w-4" /> Post a Job
            </Button>
          )}
        </div>

        {jobs.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No jobs available at the moment</p>
            {userRole === "customer" && (
              <Button onClick={() => navigate("/jobs/new")}>Post Your First Job</Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card 
                key={job.id} 
                className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow cursor-pointer"
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{job.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {job.event_date && new Date(job.event_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {job.location_address || "Location TBD"}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      {job.headcount} guests
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {job.budget_min_cents && formatCurrency(job.budget_min_cents)}
                      {job.budget_max_cents && ` - ${formatCurrency(job.budget_max_cents)}`}
                    </div>
                  </div>

                  {job.cuisine && job.cuisine.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.cuisine.slice(0, 3).map((cuisine, idx) => (
                        <Badge key={idx} variant="secondary">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {(job.metrics as any)?.bids_count || 0} bids
                      </span>
                      <Badge>Open</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
