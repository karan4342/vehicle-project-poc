'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Blocks, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    projectName: "",
    partName: "",
    styleName: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem('projectData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        projectName: "",
        partName: "",
        styleName: "",
      });
      if (parsedData.date) {
        setDate(new Date(parsedData.date));
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      date: format(date, "yyyy-MM-dd"),
    };
    localStorage.setItem('projectData', JSON.stringify(data));
    router.push(`/components?data=${encodeURIComponent(JSON.stringify(data))}`);

    toast.success("Project data saved successfully!");

  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Blocks className="h-8 w-8 text-violet-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">LOGO</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* <Button variant="ghost">Documentation</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Contact</Button> */}
            </div>
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <div className="hero-pattern flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Build Beautiful Components
                <span className="text-violet-600"> Faster</span>
              </h1>
              <p className="text-lg text-gray-600">
                Create, customize, and manage your components with our intuitive builder.
                Start crafting your perfect UI today.
              </p>
            </div>

            <Card className="border border-gray-300 hover:border-violet-700">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">
                  Start Your Project
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Project Name
                    </label>
                    <Input
                      required
                      placeholder="Enter project name"
                      value={formData.projectName}
                      onChange={(e) =>
                        setFormData({ ...formData, projectName: e.target.value })
                      }
                      className="w-full my-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Part Name
                    </label>
                    <Input
                      required
                      placeholder="Enter part name"
                      value={formData.partName}
                      onChange={(e) =>
                        setFormData({ ...formData, partName: e.target.value })
                      }
                      className="w-full my-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Style Name
                    </label>
                    <Input
                      required
                      placeholder="Enter style name"
                      value={formData.styleName}
                      onChange={(e) =>
                        setFormData({ ...formData, styleName: e.target.value })
                      }
                      className="w-full my-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700">
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <Blocks className="h-6 w-6 text-violet-600" />
                <span className="ml-2 text-lg font-bold text-gray-900">LOGO</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Building the future of component design.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-violet-600">
                    Documentation
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-violet-600">
                    Guides
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-violet-600">
                    Support
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-violet-600">
                    Privacy Policy
                  </Button>
                </li>
                <li>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-violet-600">
                    Terms of Service
                  </Button>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2024 Apptware. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}