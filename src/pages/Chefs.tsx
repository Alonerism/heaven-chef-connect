import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, MapPin, DollarSign, Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type ChefListing = Tables<"chef_listings">;

const Chefs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<ChefListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    checkAuth();
    fetchListings();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth?role=customer");
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

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from("chef_listings")
        .select("*")
        .eq("is_active", true)
        .order("rating_avg", { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading chefs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (cents: number | null) => {
    if (!cents) return "Contact for pricing";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(cents / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading chefs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find a Chef</h1>
            <p className="text-muted-foreground">Browse professional chef profiles and send booking requests</p>
          </div>
          {userRole === "chef" && (
            <Button onClick={() => navigate("/listings/new")}>
              <Plus className="mr-2 h-4 w-4" /> Create Listing
            </Button>
          )}
        </div>

        {listings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No chefs available at the moment</p>
            {userRole === "chef" && (
              <Button onClick={() => navigate("/listings/new")}>Create Your Chef Profile</Button>
            )}
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <Card 
                key={listing.id} 
                className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-shadow cursor-pointer"
                onClick={() => navigate(`/chefs/${listing.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-16 w-16 mr-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {listing.title?.charAt(0) || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{listing.title}</h3>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-accent fill-accent mr-1" />
                        <span className="text-sm font-medium">
                          {listing.rating_avg?.toFixed(1) || "New"}
                        </span>
                        {listing.rating_count > 0 && (
                          <span className="text-sm text-muted-foreground ml-1">
                            ({listing.rating_count})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {listing.bio || "Professional chef available for hire"}
                  </p>

                  {listing.cuisines && listing.cuisines.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {listing.cuisines.slice(0, 3).map((cuisine, idx) => (
                        <Badge key={idx} variant="secondary">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {listing.city ? `${listing.city}, ${listing.state}` : "Location flexible"}
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      <DollarSign className="mr-2 h-4 w-4" />
                      {formatCurrency(listing.base_price_cents)} / {listing.price_unit}
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

export default Chefs;
