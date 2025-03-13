'use client';

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ArrowLeft, ArrowRight, Save, Image as ImageIcon, FileInput as InputIcon, Blocks } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const DraggableComponent = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`cursor-move transition-all ${
        isDragging ? "opacity-50" : "opacity-100"
      } hover:scale-105`}
    >
      {children}
    </div>
  );
};

const DroppedComponent = ({ id, left, top, type, onRemove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "placed-component",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getComponentContent = () => {
    switch (type) {
      case "leftArrow":
        return <ArrowLeft className="h-8 w-8 text-violet-600" />;
      case "rightArrow":
        return <ArrowRight className="h-8 w-8 text-violet-600" />;
      case "input":
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-200 min-w-[200px]">
            <InputIcon className="h-6 w-6 text-violet-600 mb-2" />
            <div className="h-8 bg-violet-50 rounded" />
          </div>
        );
      case "image":
        return (
          <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-200">
            <ImageIcon className="h-6 w-6 text-violet-600 mb-2" />
            <div className="w-[200px] h-[150px] bg-violet-50 rounded flex items-center justify-center">
              <ImageIcon className="h-12 w-12 text-violet-300" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left,
        top,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
      className="group"
    >
      {getComponentContent()}
      <Button
        variant="destructive"
        size="sm"
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(id)}
      >
        ×
      </Button>
    </div>
  );
};

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ["component", "placed-component"],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const dropZoneBounds = document.querySelector(".drop-zone").getBoundingClientRect();
      const x = offset.x - dropZoneBounds.left;
      const y = offset.y - dropZoneBounds.top;
      
      if (item.type) {
        onDrop(null, x, y, item.type);
      } else {
        onDrop(item.id, x, y);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`drop-zone relative w-full h-[600px] rounded-lg border-2 border-dashed transition-colors ${
        isOver ? "border-violet-500 bg-violet-50/50" : "border-gray-200"
      }`}
    >
      {children}
    </div>
  );
};

const ComponentPage = () => {
  const { name } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [components, setComponents] = useState([]);
  const [nextId, setNextId] = useState(1);
  
  const data = searchParams.get("data")
    ? JSON.parse(decodeURIComponent(searchParams.get("data")))
    : {};

  useEffect(() => {
    const savedComponents = localStorage.getItem(`components-${name}`);
    if (savedComponents) {
      const parsed = JSON.parse(savedComponents);
      setComponents(parsed);
      setNextId(Math.max(...parsed.map(c => c.id)) + 1);
    }
  }, [name]);

  const handleDrop = (id, left, top, type) => {
    if (id) {
      // Moving existing component
      setComponents(prev =>
        prev.map(comp =>
          comp.id === id ? { ...comp, left, top } : comp
        )
      );
    } else {
      // Adding new component
      setComponents(prev => [...prev, { id: nextId, type, left, top }]);
      setNextId(prev => prev + 1);
    }
  };

  const handleRemove = (id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    toast.success("Component removed successfully!");
  };

  const handleSave = () => {
    localStorage.setItem(`components-${name}`, JSON.stringify(components));
    toast.success("Layout saved successfully!");
  };

  const componentTypes = [
    { type: "leftArrow", icon: ArrowLeft, label: "Left Arrow" },
    { type: "rightArrow", icon: ArrowRight, label: "Right Arrow" },
    { type: "input", icon: InputIcon, label: "Input" },
    { type: "image", icon: ImageIcon, label: "Image" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-7xl mx-auto ">
        <nav className="border-b bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center space-x-3">
                <Blocks className="h-8 w-8 text-violet-600" />
                <span className="text-xl font-bold text-gray-900">ComponentCraft</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleSave}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Layout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="rounded-none border border-none hover:border-violet-500">
            <CardHeader className="space-y-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-violet-600">
                    <span>{decodeURIComponent(name)}</span> COMPONENT
                </CardTitle>
              </div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Badge variant="secondary" className="text-violet-600 bg-violet-50">Project Details</Badge>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <p className="text-sm font-medium text-violet-900">Project Name</p>
                      <p className="text-violet-700">{data.projectName}</p>
                    </div>
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <p className="text-sm font-medium text-violet-900">Part Name</p>
                      <p className="text-violet-700">{data.partName}</p>
                    </div>
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <p className="text-sm font-medium text-violet-900">Style Name</p>
                      <p className="text-violet-700">{data.styleName}</p>
                    </div>
                    <div className="bg-violet-50 p-2 rounded-lg">
                      <p className="text-sm font-medium text-violet-900">Date</p>
                      <p className="text-violet-700">{data.date}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Badge variant="secondary" className="text-violet-600 bg-violet-50">Available Components</Badge>
                  <div className="grid grid-cols-2 gap-4">
                    {componentTypes.map(({ type, icon: Icon, label }) => (
                      <DraggableComponent key={type} type={type}>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-violet-600" />
                          <span className="font-medium text-gray-700">{label}</span>
                        </div>
                      </DraggableComponent>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <DropZone onDrop={handleDrop}>
                {components.map((component) => (
                  <DroppedComponent
                    key={component.id}
                    id={component.id}
                    left={component.left}
                    top={component.top}
                    type={component.type}
                    onRemove={handleRemove}
                  />
                ))}
              </DropZone>
            </CardContent>
          </Card>
        </div>
      </div>
    </DndProvider>
  );
};

export default ComponentPage;