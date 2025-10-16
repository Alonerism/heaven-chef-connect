import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Users, Calendar, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[image:var(--gradient-hero)] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <ChefHat className="h-16 w-16 text-primary-foreground" />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
            Heaven Chef
          </h1>
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            Fresh, professional, stress-free chef at your fingertips
          </p>
          <p className="text-lg text-primary-foreground/80 mb-12 max-w-2xl mx-auto">
            Connect with talented chefs for your next event or discover amazing opportunities to showcase your culinary skills
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/jobs">
                Post a Job <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
              <Link to="/chefs">
                Find a Chef <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            How Heaven Chef Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 shadow-[var(--shadow-card)] border-border/50 bg-[image:var(--gradient-card)]">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Customers</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Post your event details and budget</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Receive competitive bids from qualified chefs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Review proposals and select the perfect chef</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Enjoy your event stress-free</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 shadow-[var(--shadow-card)] border-border/50 bg-[image:var(--gradient-card)]">
              <ChefHat className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-2xl font-bold mb-4">For Chefs</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Create your professional chef profile</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Browse and bid on exciting opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Receive direct booking requests</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Build your reputation and grow your business</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-3">
                <Calendar className="h-10 w-10 text-primary" />
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">1,000+</p>
              <p className="text-muted-foreground">Events Served</p>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <ChefHat className="h-10 w-10 text-secondary" />
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">500+</p>
              <p className="text-muted-foreground">Professional Chefs</p>
            </div>
            <div>
              <div className="flex justify-center mb-3">
                <Star className="h-10 w-10 text-accent" />
              </div>
              <p className="text-4xl font-bold text-foreground mb-2">4.9/5</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Heaven Chef today and experience the future of chef services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="default" className="text-lg px-8">
              <Link to="/jobs">
                Post Your First Job
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8">
              <Link to="/chefs">
                Join as a Chef
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
