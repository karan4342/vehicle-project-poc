// 'use client';

// import React, { useState, useEffect } from "react";
// import { useSearchParams, useRouter, useParams } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { DndProvider } from "react-dnd";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Save,
//   Image as ImageIcon,
//   FileInput as InputIcon,
//   Blocks
// } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";

// const DraggableComponent = ({ type, children }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: "component",
//     item: { type },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   });

//   return (
//     <div
//       ref={drag}
//       className={`cursor-move transition-all ${
//         isDragging ? "opacity-50" : "opacity-100"
//       } hover:scale-105`}
//     >
//       {children}
//     </div>
//   );
// };

// const DroppedComponent = ({ id, left, top, type, text, onRemove, onTextChange }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: "placed-component",
//     item: { id, left, top },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging()
//     })
//   });

//   const getComponentContent = () => {
//     switch (type) {
//       case "leftArrow":
//         return <ArrowLeft className="h-8 w-8 text-violet-600" />;
//       case "rightArrow":
//         return <ArrowRight className="h-8 w-8 text-violet-600" />;
//       case "input":
//         return (
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-200 min-w-[200px]">
//             <InputIcon className="h-6 w-6 text-violet-600 mb-2" />
//             <input
//               type="text"
//               value={text || ""}
//               onChange={(e) => onTextChange(e.target.value)}
//               placeholder="Type here..."
//               className="h-8 bg-violet-50 rounded p-1 w-full border border-gray-300"
//             />
//           </div>
//         );
//       case "image":
//         return (
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-200">
//             <ImageIcon className="h-6 w-6 text-violet-600 mb-2" />
//             <div className="w-[200px] h-[150px] bg-violet-50 rounded flex items-center justify-center">
//               <ImageIcon className="h-12 w-12 text-violet-300" />
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       ref={drag}
//       style={{
//         position: "absolute",
//         left,
//         top,
//         opacity: isDragging ? 0.5 : 1,
//         cursor: "move"
//       }}
//       className="group"
//     >
//       {getComponentContent()}
//       <Button
//         variant="destructive"
//         size="sm"
//         className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
//         onClick={() => onRemove(id)}
//       >
//         ×
//       </Button>
//     </div>
//   );
// };

// const DropZone = ({ onDrop, children }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: ["component", "placed-component"],
//     drop: (item, monitor) => {
//       const offset = monitor.getClientOffset();
//       const dropZoneBounds = document.querySelector(".drop-zone").getBoundingClientRect();
//       const x = offset.x - dropZoneBounds.left;
//       const y = offset.y - dropZoneBounds.top;

//       if (item.type) {
//         onDrop(null, x, y, item.type);
//       } else {
//         onDrop(item.id, x, y);
//       }
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver()
//     })
//   });

//   return (
//     <div
//       ref={drop}
//       className={`drop-zone relative w-full h-[600px] rounded-lg border-2 border-dashed transition-colors ${
//         isOver ? "border-violet-500 bg-violet-50/50" : "border-gray-200"
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

// const ComponentPage = () => {
//   const { name } = useParams();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [components, setComponents] = useState([]);
//   const [nextId, setNextId] = useState(1);

//   const data = searchParams.get("data")
//     ? JSON.parse(decodeURIComponent(searchParams.get("data")))
//     : {};

//   useEffect(() => {
//     const savedComponents = localStorage.getItem(`components-${name}`);
//     if (savedComponents) {
//       const parsed = JSON.parse(savedComponents);
//       setComponents(parsed);
//       setNextId(Math.max(...parsed.map(c => c.id)) + 1);
//     }
//   }, [name]);

//   const handleDrop = (id, left, top, type) => {
//     if (id) {
//       // Moving existing component
//       setComponents(prev =>
//         prev.map(comp =>
//           comp.id === id ? { ...comp, left, top } : comp
//         )
//       );
//     } else {
//       // Adding new component
//       const newComponent = { id: nextId, type, left, top };
//       if (type === "input") {
//         newComponent.text = "";
//       }
//       setComponents(prev => [...prev, newComponent]);
//       setNextId(prev => prev + 1);
//     }
//   };

//   const handleRemove = (id) => {
//     setComponents(prev => prev.filter(comp => comp.id !== id));
//     toast.success("Component removed successfully!");
//   };

//   const handleInputChange = (id, newText) => {
//     setComponents(prev =>
//       prev.map(comp =>
//         comp.id === id ? { ...comp, text: newText } : comp
//       )
//     );
//   };

//   const handleSave = () => {
//     localStorage.setItem(`components-${name}`, JSON.stringify(components));
//     toast.success("Layout saved successfully!");
//     // Trigger print dialog to allow printing to PDF
//     window.print();
//   };

//   const componentTypes = [
//     { type: "leftArrow", icon: ArrowLeft, label: "Left Arrow" },
//     { type: "rightArrow", icon: ArrowRight, label: "Right Arrow" },
//     { type: "input", icon: InputIcon, label: "Input" },
//     { type: "image", icon: ImageIcon, label: "Image" }
//   ];

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="max-w-7xl mx-auto">
//         <nav className="border-b bg-white sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between h-16 items-center">
//               <div className="flex items-center space-x-3">
//                 <Blocks className="h-8 w-8 text-violet-600" />
//                 <span className="text-xl font-bold text-gray-900">ComponentCraft</span>
//               </div>
//               <div className="flex items-center space-x-4">
//                 <Button
//                   variant="ghost"
//                   onClick={() => router.back()}
//                   className="flex items-center"
//                 >
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back
//                 </Button>
//                 <Button
//                   onClick={handleSave}
//                   className="bg-violet-600 hover:bg-violet-700"
//                 >
//                   <Save className="mr-2 h-4 w-4" />
//                   Save Layout
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </nav>

//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <Card className="rounded-none border border-none hover:border-violet-500">
//             <CardHeader className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <CardTitle className="text-2xl text-violet-600">
//                   <span>{decodeURIComponent(name)}</span> COMPONENT
//                 </CardTitle>
//               </div>

//               <div className="grid grid-cols-2 gap-8">
//                 <div className="space-y-3">
//                   <Badge variant="secondary" className="text-violet-600 bg-violet-50">
//                     Project Details
//                   </Badge>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div className="bg-violet-50 p-2 rounded-lg">
//                       <p className="text-sm font-medium text-violet-900">Project Name</p>
//                       <p className="text-violet-700">{data.projectName}</p>
//                     </div>
//                     <div className="bg-violet-50 p-2 rounded-lg">
//                       <p className="text-sm font-medium text-violet-900">Part Name</p>
//                       <p className="text-violet-700">{data.partName}</p>
//                     </div>
//                     <div className="bg-violet-50 p-2 rounded-lg">
//                       <p className="text-sm font-medium text-violet-900">Style Name</p>
//                       <p className="text-violet-700">{data.styleName}</p>
//                     </div>
//                     <div className="bg-violet-50 p-2 rounded-lg">
//                       <p className="text-sm font-medium text-violet-900">Date</p>
//                       <p className="text-violet-700">{data.date}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-3">
//                   <Badge variant="secondary" className="text-violet-600 bg-violet-50">
//                     Available Components
//                   </Badge>
//                   <div className="grid grid-cols-2 gap-4">
//                     {componentTypes.map(({ type, icon: Icon, label }) => (
//                       <DraggableComponent key={type} type={type}>
//                         <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all flex items-center space-x-3">
//                           <Icon className="h-5 w-5 text-violet-600" />
//                           <span className="font-medium text-gray-700">{label}</span>
//                         </div>
//                       </DraggableComponent>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>

//             <CardContent className="pt-6">
//               <DropZone onDrop={handleDrop}>
//                 {components.map((component) => (
//                   <DroppedComponent
//                     key={component.id}
//                     id={component.id}
//                     left={component.left}
//                     top={component.top}
//                     type={component.type}
//                     text={component.type === "input" ? component.text : undefined}
//                     onRemove={handleRemove}
//                     onTextChange={
//                       component.type === "input"
//                         ? (value) => handleInputChange(component.id, value)
//                         : undefined
//                     }
//                   />
//                 ))}
//               </DropZone>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </DndProvider>
//   );
// };

// export default ComponentPage;


// // "use client";

// // import React, { useState, useEffect } from "react";
// // import { useSearchParams, useRouter, useParams } from "next/navigation";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { useDrag, useDrop } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import { DndProvider } from "react-dnd";
// // import Image from "next/image";
// // import {
// //   ArrowLeft,
// //   ArrowRight,
// //   Save,
// //   Image as ImageIcon,
// //   FileInput as InputIcon,
// //   Blocks,
// //   MergeIcon,
// //   CircleDot
// // } from "lucide-react";
// // import { Badge } from "@/components/ui/badge";
// // import { toast } from "sonner";
// // import { Separator } from "@/components/ui/separator";

// // const DraggableComponent = ({ type, children }) => {
// //   const [{ isDragging }, drag] = useDrag({
// //     type: "component",
// //     item: { type },
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging()
// //     })
// //   });

// //   return (
// //     <div
// //       ref={drag}
// //       className={`cursor-move transition-all ${
// //         isDragging ? "opacity-50" : "opacity-100"
// //       } hover:scale-105`}
// //     >
// //       {children}
// //     </div>
// //   );
// // };

// // const DroppedComponent = ({ id, left, top, type, text, onRemove, onTextChange }) => {
// //   const [{ isDragging }, drag] = useDrag({
// //     type: "placed-component",
// //     item: { id, left, top },
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging()
// //     })
// //   });

// //   const getComponentContent = () => {
// //     switch (type) {
// //       case "leftArrow":
// //         return <ArrowLeft className="h-8 w-8 text-red-600" />;
// //       case "rightArrow":
// //         return <ArrowRight className="h-8 w-8 text-green-600" />;
// //       case "input":
// //         return (
// //           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 min-w-[200px]">
// //             <InputIcon className="h-6 w-6 text-gray-600 mb-2" />
// //             <input
// //               type="text"
// //               value={text || ""}
// //               onChange={(e) => onTextChange(e.target.value)}
// //               placeholder="Type here..."
// //               className="h-8 bg-gray-50 rounded p-1 w-full border border-gray-300"
// //             />
// //           </div>
// //         );
// //       case "image":
// //         return (
// //           <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
// //             <ImageIcon className="h-6 w-6 text-gray-600 mb-2" />
// //             <div className="w-[200px] h-[150px] bg-gray-50 rounded flex items-center justify-center">
// //               <ImageIcon className="h-12 w-12 text-gray-300" />
// //             </div>
// //           </div>
// //         );
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div
// //       ref={drag}
// //       style={{
// //         position: "absolute",
// //         left,
// //         top,
// //         opacity: isDragging ? 0.5 : 1,
// //         cursor: "move"
// //       }}
// //       className="group"
// //     >
// //       {getComponentContent()}
// //       <Button
// //         variant="destructive"
// //         size="sm"
// //         className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
// //         onClick={() => onRemove(id)}
// //       >
// //         ×
// //       </Button>
// //     </div>
// //   );
// // };

// // const DropZone = ({ onDrop, children }) => {
// //   const [{ isOver }, drop] = useDrop({
// //     accept: ["component", "placed-component"],
// //     drop: (item, monitor) => {
// //       const offset = monitor.getClientOffset();
// //       const dropZoneBounds = document.querySelector(".drop-zone").getBoundingClientRect();
// //       const x = offset.x - dropZoneBounds.left;
// //       const y = offset.y - dropZoneBounds.top;

// //       if (item.type) {
// //         onDrop(null, x, y, item.type);
// //       } else {
// //         onDrop(item.id, x, y);
// //       }
// //     },
// //     collect: (monitor) => ({
// //       isOver: monitor.isOver()
// //     })
// //   });

// //   return (
// //     <div
// //       ref={drop}
// //       className={`drop-zone relative w-full h-[600px] rounded-lg border-2 border-dashed transition-colors ${
// //         isOver ? "border-gray-400 bg-gray-50/50" : "border-gray-200"
// //       }`}
// //     >
// //       <div className="absolute inset-0 pointer-events-none">
// //         <Image
// //           src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-electric-car-chassis-with-battery-vector-car-rechargeable-blueprint-vector-picture-image_10969958.png"
// //           alt="Car Part Blueprint"
// //           layout="fill"
// //           objectFit="contain"
// //           className="opacity-20"
// //         />
// //       </div>
// //       {children}
// //     </div>
// //   );
// // };

// // const ComponentPage = () => {
// //   const { name } = useParams();
// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const [components, setComponents] = useState([]);
// //   const [nextId, setNextId] = useState(1);

// //   const data = searchParams.get("data")
// //     ? JSON.parse(decodeURIComponent(searchParams.get("data")))
// //     : {};

// //   useEffect(() => {
// //     const savedComponents = localStorage.getItem(`components-${name}`);
// //     if (savedComponents) {
// //       const parsed = JSON.parse(savedComponents);
// //       setComponents(parsed);
// //       setNextId(Math.max(...parsed.map(c => c.id)) + 1);
// //     }
// //   }, [name]);

// //   const handleDrop = (id, left, top, type) => {
// //     if (id) {
// //       setComponents(prev =>
// //         prev.map(comp =>
// //           comp.id === id ? { ...comp, left, top } : comp
// //         )
// //       );
// //     } else {
// //       const newComponent = { id: nextId, type, left, top };
// //       if (type === "input") {
// //         newComponent.text = "";
// //       }
// //       setComponents(prev => [...prev, newComponent]);
// //       setNextId(prev => prev + 1);
// //     }
// //   };

// //   const handleRemove = (id) => {
// //     setComponents(prev => prev.filter(comp => comp.id !== id));
// //     toast.success("Component removed successfully!");
// //   };

// //   const handleInputChange = (id, newText) => {
// //     setComponents(prev =>
// //       prev.map(comp =>
// //         comp.id === id ? { ...comp, text: newText } : comp
// //       )
// //     );
// //   };

// //   const handleSave = () => {
// //     localStorage.setItem(`components-${name}`, JSON.stringify(components));
// //     toast.success("Layout saved successfully!");
// //     window.print();
// //   };

// //   const componentTypes = [
// //     { type: "leftArrow", icon: ArrowLeft, label: "Not Analog", color: "bg-red-100 text-red-700 border-red-200" },
// //     { type: "rightArrow", icon: ArrowRight, label: "Analog", color: "bg-green-100 text-green-700 border-green-200" },
// //     { type: "input", icon: InputIcon, label: "Measurement", color: "bg-blue-100 text-blue-700 border-blue-200" },
// //     { type: "image", icon: ImageIcon, label: "Reference", color: "bg-gray-100 text-gray-700 border-gray-200" }
// //   ];

// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <div className="min-h-screen bg-white">
// //         <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
// //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //             <div className="flex justify-between h-16 items-center">
// //               <div className="flex items-center space-x-3">
// //                 <Image
// //                   src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=40&h=40&fit=crop"
// //                   alt="Mercedes Logo"
// //                   width={40}
// //                   height={40}
// //                   className="rounded-full"
// //                 />
// //                 <span className="text-xl font-bold text-gray-900">BRXXX</span>
// //               </div>
// //               <div className="flex items-center space-x-8">
// //                 <div className="text-2xl font-bold tracking-wider">AMG</div>
// //                 <Button
// //                   variant="ghost"
// //                   onClick={() => router.back()}
// //                   className="flex items-center"
// //                 >
// //                   <ArrowLeft className="mr-2 h-4 w-4" />
// //                   Back
// //                 </Button>
// //                 <Button
// //                   onClick={handleSave}
// //                   className="bg-gray-900 hover:bg-gray-800 text-white"
// //                 >
// //                   <Save className="mr-2 h-4 w-4" />
// //                   Save Layout
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </nav>

// //         <div className="max-w-7xl mx-auto px-4 py-8">
// //           <Card className="border-none shadow-lg">
// //             <CardHeader className="space-y-6">
// //               <div className="flex items-center justify-between">
// //                 <div className="space-y-1">
// //                   <CardTitle className="text-2xl text-gray-900">
// //                     {decodeURIComponent(name)}
// //                   </CardTitle>
// //                   <div className="text-sm text-gray-500">
// //                     Vergleich zur Serie Beschnitt
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center space-x-4">
// //                   <Badge variant="outline" className="text-gray-700">
// //                     TT.MM.2023
// //                   </Badge>
// //                   <Badge variant="outline" className="text-gray-700">
// //                     Tastungsstrak
// //                   </Badge>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 gap-8">
// //                 <div className="space-y-3">
// //                   <Badge variant="outline" className="text-gray-700">
// //                     Project Details
// //                   </Badge>
// //                   <div className="grid grid-cols-2 gap-3">
// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <p className="text-sm font-medium text-gray-700">Project Name</p>
// //                       <p className="text-gray-900">{data.projectName}</p>
// //                     </div>
// //                     <div className="bg-gray-50 p-3 rounded-lg">
// //                       <p className="text-sm font-medium text-gray-700">Part Name</p>
// //                       <p className="text-gray-900">{data.partName}</p>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-3">
// //                   <Badge variant="outline" className="text-gray-700">
// //                     Components
// //                   </Badge>
// //                   <div className="grid grid-cols-2 gap-4">
// //                     {componentTypes.map(({ type, icon: Icon, label, color }) => (
// //                       <DraggableComponent key={type} type={type}>
// //                         <div className={`p-3 rounded-lg border ${color} hover:shadow-md transition-all flex items-center space-x-3`}>
// //                           <Icon className="h-5 w-5" />
// //                           <span className="font-medium">{label}</span>
// //                         </div>
// //                       </DraggableComponent>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardHeader>

// //             <CardContent className="pt-6">
// //               <DropZone onDrop={handleDrop}>
// //                 {components.map((component) => (
// //                   <DroppedComponent
// //                     key={component.id}
// //                     id={component.id}
// //                     left={component.left}
// //                     top={component.top}
// //                     type={component.type}
// //                     text={component.type === "input" ? component.text : undefined}
// //                     onRemove={handleRemove}
// //                     onTextChange={
// //                       component.type === "input"
// //                         ? (value) => handleInputChange(component.id, value)
// //                         : undefined
// //                     }
// //                   />
// //                 ))}
// //               </DropZone>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </DndProvider>
// //   );
// // };

// // export default ComponentPage;











// "use client"

// import { useEffect, useState, useRef } from "react"
// import { useRouter } from "next/navigation"
// import Image from "next/image"
// import { X } from "lucide-react"

// export default function Components() {
//   const router = useRouter()
//   const [projectData, setProjectData] = useState(null)
//   const [dragging, setDragging] = useState(false)
//   const [position, setPosition] = useState({ x: 0, y: 0 })
//   const [offset, setOffset] = useState({ x: 0, y: 0 })
//   const imageRef = useRef(null)
//   const containerRef = useRef(null)

//   useEffect(() => {
//     const savedData = localStorage.getItem("projectData")
//     if (!savedData) {
//       router.push("/")
//     } else {
//       setProjectData(JSON.parse(savedData))
//     }

//     // Center the image initially
//     if (containerRef.current && imageRef.current) {
//       const containerRect = containerRef.current.getBoundingClientRect()
//       setPosition({
//         x: (containerRect.width - 600) / 2,
//         y: 50,
//       })
//     }
//   }, [router])

//   // Mouse event handlers for dragging
//   const handleMouseDown = (e) => {
//     if (imageRef.current) {
//       const rect = imageRef.current.getBoundingClientRect()
//       setOffset({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       })
//       setDragging(true)
//     }
//   }

//   const handleMouseMove = (e) => {
//     if (dragging && containerRef.current) {
//       const containerRect = containerRef.current.getBoundingClientRect()
//       const newX = e.clientX - containerRect.left - offset.x
//       const newY = e.clientY - containerRect.top - offset.y

//       // Keep image within container bounds
//       const maxX = containerRect.width - (imageRef.current?.offsetWidth || 600)
//       const maxY = containerRect.height - (imageRef.current?.offsetHeight || 400)

//       setPosition({
//         x: Math.max(0, Math.min(newX, maxX)),
//         y: Math.max(0, Math.min(newY, maxY)),
//       })
//     }
//   }

//   const handleMouseUp = () => {
//     setDragging(false)
//   }

//   // Add and remove event listeners
//   useEffect(() => {
//     if (dragging) {
//       window.addEventListener("mousemove", handleMouseMove)
//       window.addEventListener("mouseup", handleMouseUp)
//     } else {
//       window.removeEventListener("mousemove", handleMouseMove)
//       window.removeEventListener("mouseup", handleMouseUp)
//     }

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove)
//       window.removeEventListener("mouseup", handleMouseUp)
//     }
//   }, [dragging])

//   // Avoid rendering if projectData is not yet available.
//   if (!projectData) return null

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="border-b border-gray-200 bg-white">
//         <div className="max-w-7xl mx-auto px-4 py-2">
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col">
//               <div className="text-xl font-bold text-gray-800">BRXXX</div>
//               <div className="text-sm text-gray-600">{projectData.partName || "Stoßfänger vorne"}</div>
//               <div className="mt-2 flex items-center">
//                 <div className="w-4 h-4 bg-black mr-2"></div>
//                 <span className="text-xs">LINE</span>
//               </div>
//             </div>

//             <div className="flex items-center justify-center">
//               {/* Mercedes logo */}
//               <div className="w-16 h-16 relative">
//                 <Image
//                   src="/placeholder.svg?height=64&width=64"
//                   alt="Mercedes Logo"
//                   width={64}
//                   height={64}
//                   className="object-contain"
//                 />
//               </div>
//             </div>

//             <div>
//               {/* AMG Logo */}
//               <div className="text-xl font-bold tracking-widest">AMG</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto border-t border-gray-300">
//         <div className="flex">
//           {/* Left sidebar */}
//           <div className="w-64 bg-gray-100 border-r border-gray-300">
//             <div className="p-4 border-b border-gray-300">
//               <div className="text-xs text-gray-500">TASTUNGSSTRAK</div>
//               <div className="text-sm font-medium mt-1 border border-gray-300 bg-white p-1 text-center">TT.MM.2023</div>
//             </div>

//             <div className="p-4 border-b border-gray-300">
//               <div className="text-xs text-gray-500">ABGLEICHUNG</div>
//               <div className="text-sm font-medium mt-1 border border-gray-300 bg-white p-1 text-center">TT.MM.2023</div>
//             </div>

//             <div className="p-4 border-b border-gray-300">
//               <div className="text-center font-medium text-gray-700 mb-2">
//                 VERGLEICH ZUR
//                 <br />
//                 SERIE BESCHNITT
//               </div>

//               <div className="bg-gray-200 p-2 rounded">
//                 <Image
//                   src="/placeholder.svg?height=100&width=180"
//                   alt="Comparison Image"
//                   width={180}
//                   height={100}
//                   className="w-full h-auto border border-blue-300"
//                 />
//               </div>
//             </div>

//             <div className="p-4 border-b border-gray-300">
//               <div className="text-xs font-medium text-gray-700 mb-2">UNTERSUCHUNGSAUFTRAG</div>
//               <div className="text-xs text-gray-600">Abweichung Vergleich Beschnitt zur Serie</div>
//             </div>

//             <div className="p-4 border-b border-gray-300">
//               <div className="text-xs font-medium text-gray-700 mb-2">PRÜF EINDARSTELLUNG</div>
//               <div className="text-xs text-blue-500">Click to add text</div>
//               <div className="mt-2 flex justify-center">
//                 <Image
//                   src="/placeholder.svg?height=50&width=50"
//                   alt="Test Icon"
//                   width={50}
//                   height={50}
//                   className="opacity-70"
//                 />
//               </div>
//             </div>

//             <div className="p-4 border-b border-gray-300">
//               <div className="text-xs font-medium text-gray-700 mb-2">LÖSUNGSANSATZ</div>
//               <div className="text-xs text-blue-500">Click to add text</div>
//               <div className="mt-2">
//                 <Image
//                   src="/placeholder.svg?height=100&width=180"
//                   alt="Solution Diagram"
//                   width={180}
//                   height={100}
//                   className="w-full h-auto"
//                 />
//               </div>
//             </div>

//             <div className="p-4">
//               <div className="text-xs font-medium text-gray-700 mb-2">VERANTWORTLICHKEIT</div>
//               <div className="flex items-center mt-2">
//                 <input type="radio" className="mr-2" name="responsibility" />
//                 <span className="text-xs">Produktionsbereich</span>
//               </div>
//               <div className="flex items-center mt-1">
//                 <input type="radio" className="mr-2" name="responsibility" />
//                 <span className="text-xs">Gesamtlieferung</span>
//               </div>
//             </div>
//           </div>

//           {/* Main content area */}
//           <div
//             className="flex-1 relative bg-white p-4"
//             ref={containerRef}
//             onMouseMove={dragging ? handleMouseMove : null}
//             onMouseUp={handleMouseUp}
//           >
//             {/* Car part image - draggable */}
//             <div
//               ref={imageRef}
//               style={{
//                 position: "absolute",
//                 left: `${position.x}px`,
//                 top: `${position.y}px`,
//                 cursor: dragging ? "grabbing" : "grab",
//                 zIndex: 10,
//               }}
//               onMouseDown={handleMouseDown}
//               className="select-none"
//             >
//               <Image
//                 src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-electric-car-chassis-with-battery-vector-car-rechargeable-blueprint-vector-picture-image_10969958.png"
//                 alt="Car Chassis"
//                 width={600}
//                 height={400}
//                 className="max-w-full h-auto"
//                 unoptimized={true}
//               />
//             </div>

//             {/* Status indicator in corner */}
//             <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-1">Y 0</div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="max-w-7xl mx-auto border-t border-gray-300 bg-gray-600 text-white p-2 flex justify-between items-center">
//         <div className="text-lg font-bold">i.O/n.i.O</div>
//         <div className="flex gap-4 text-xs">
//           <div>
//             <div>Erstellt:</div>
//             <div>Name</div>
//           </div>
//           <div>
//             <div>Name</div>
//             <div>XXXXX-XXXXX, XXXX XX XX XXX</div>
//           </div>
//         </div>
//         <div>
//           <Image
//             src="/placeholder.svg?height=30&width=100"
//             alt="Techniplas Logo"
//             width={100}
//             height={30}
//             className="object-contain"
//           />
//         </div>
//         <div>Folie 8</div>
//       </div>
//     </div>
//   )
// }




"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Image from "next/image";

import {
  ArrowLeft,
  ArrowRight,
  Save,
  Image as ImageIcon,
  FileInput as InputIcon,
  CircleDot,
  X
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const statusLegend = [
  { label: "wird berechnet", color: "bg-violet-400" },
  { label: "n.i.O", color: "bg-red-400" },
  { label: "nicht bewertet", color: "bg-violet-300" },
  { label: "nicht für Variante", color: "bg-violet-500" },
  { label: "i.O", color: "bg-green-400" },
  { label: "nicht relevant", color: "bg-violet-200" },
];

const DraggableComponent = ({ type, children }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "component",
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
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

const DroppedComponent = ({ id, left, top, type, text, onRemove, onTextChange }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "placed-component",
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
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
            <input
              type="text"
              value={text || ""}
              onChange={(e) => onTextChange(e.target.value)}
              placeholder="Type here..."
              className="h-8 bg-violet-50 rounded p-1 w-full border border-gray-300"
            />
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
        cursor: "move"
      }}
      className="group"
    >
      {getComponentContent()}
      <button
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(id)}
      >
        <X className="h-3 w-3" />
      </button>
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
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={`drop-zone relative flex-1 min-h-[calc(100vh-16rem)] transition-colors ${
        isOver ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="https://png.pngtree.com/png-clipart/20230817/original/pngtree-electric-car-chassis-with-battery-vector-car-rechargeable-blueprint-vector-picture-image_10969958.png"
          alt="Car Part Blueprint"
          layout="fill"
          objectFit="contain"
          className="opacity-20"
        />
      </div>
      {children}
      <div className="absolute bottom-4 right-4 bg-orange-500 text-white px-4 py-1 text-sm font-medium rounded">
        Y 0
      </div>
    </div>
  );
};

const ComponentPage = () => {
  const { name } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [components, setComponents] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [projectData, setProjectData] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("any");

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

  useEffect(() => {
    const storedStatus = localStorage.getItem("selectedStatus");
    if (storedStatus) {
      setSelectedStatus(storedStatus);
    }
  }, []);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    console.log("Selected status:", value);
    toast.success("Status updated");
    localStorage.setItem("selectedStatus", value);
  };

  const handleDrop = (id, left, top, type) => {
    if (id) {
      setComponents(prev =>
        prev.map(comp =>
          comp.id === id ? { ...comp, left, top } : comp
        )
      );
    } else {
      const newComponent = { id: nextId, type, left, top };
      if (type === "input") {
        newComponent.text = "";
      }
      setComponents(prev => [...prev, newComponent]);
      setNextId(prev => prev + 1);
    }
  };

  const handleRemove = (id) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    toast.success("Component removed");
  };

  const handleInputChange = (id, newText) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === id ? { ...comp, text: newText } : comp
      )
    );
  };

  const handleSave = () => {
    localStorage.setItem(`components-${name}`, JSON.stringify(components));
    toast.success("Layout saved");
    window.print();
  };

    const componentTypes = [
    { type: "leftArrow", icon: ArrowLeft, label: "Left Arrow" },
    { type: "rightArrow", icon: ArrowRight, label: "Right Arrow" },
    { type: "input", icon: InputIcon, label: "Input" },
    { type: "image", icon: ImageIcon, label: "Image" }
  ];

  useEffect(() => {
    const savedData = localStorage.getItem("projectData")
    if (!savedData) {
      router.push("/")
    } else {
      setProjectData(JSON.parse(savedData))
    }
  }, [router])

  if (!projectData) return null

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-white">
        <div className="bg-gray-100 max-w-7xl mx-auto border  border-b-0 border-gray-400">
          <div className="mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-violet-900">
                  
                  {/*  ProjectName in Upper case*/ }
                  {projectData.projectName.toUpperCase() || "BRXXX"}

                  </div>
                <div className="">
                  <Badge variant="outline" className=" my-3 mr-2 border border-gray-500 rounded-4xl text-sm text-violet-700">
                    {projectData.styleName || "StyleName"}
                  </Badge>
                  </div>
              </div>

              {/* <div className="flex items-center justify-center">
                <Image
                  src="https://www.freepnglogos.com/uploads/car-logo-brands-png-transparent-image-7.png"
                  alt="Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div> */}

              <div className="flex items-center space-x-8">
                {/* <div className="text-xl font-bold tracking-widest">AMG</div> */}
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex items-center"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  variant="primary"
                  className="bg-violet-700 text-white hover:bg-violet-800"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Layout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto border border-gray-400">
          <div className="flex">
              {/* Left Siderbar */}
              <div className="w-64 bg-gray-100 border-r border-gray-300">
                <div className="p-4 border-b border-gray-300">
                  <div className="text-xs text-gray-500">PRÜFPLANUNG</div>
                  <div className="text-sm font-medium mt-1 border border-gray-300 bg-white p-1 text-center rounded-2xl">
                    12.03.2025
                  </div>
                </div>

                <div className="p-4 border-b border-gray-300">
                  <div className="text-xs text-gray-500">MATERIALABGLEICH</div>
                  <div className="text-sm font-medium mt-1 border border-gray-300 bg-white p-1 text-center rounded-2xl">
                    10.03.2025
                  </div>
                </div>
                 {/* <div className="space-y-3">
                   <Badge variant="outline" className="m-2 text-violet-600 bg-violet-50 rounded-4xl border border-gray-400">
                     Project Details
                   </Badge>
                   <div className="grid grid-cols-2 gap-2 mx-1">
                     <div className="bg-violet-50 p-2 rounded-lg border border-violet-200">
                       <p className="text-sm font-medium text-violet-900">Project Name</p>
                       <p className="text-violet-700 text-xs">{projectData.projectName}</p>
                     </div>
                     <div className="bg-violet-50 p-2 rounded-lg border border-violet-200">
                       <p className="text-sm font-medium text-violet-900">Part Name</p>
                       <p className="text-violet-700 text-xs">{projectData.partName}</p>
                     </div>
                     <div className="bg-violet-50 p-2 rounded-lg border border-violet-200">
                       <p className="text-sm font-medium text-violet-900">Style Name</p>
                       <p className="text-violet-700 text-xs">{projectData.styleName}</p>
                     </div>
                     <div className="bg-violet-50 p-2 rounded-lg border border-violet-200">
                       <p className="text-sm font-medium text-violet-900">Date</p>
                       <p className="text-violet-700 text-xs">{projectData.date}</p>
                     </div>
                   </div>
                 </div> */}

                 {/* <Separator className="my-2" /> */}

                <div className="p-4 border-b border-gray-300">
                  <div className="text-center font-medium text-gray-700 mb-2">
                    VERGLEICH ZUR
                    <br />
                    SERIE BESCHNITT
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                  {componentTypes.map(({ type,icon: Icon,label }) => (
                      <DraggableComponent key={type} type={type}>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-violet-100 hover:border-violet-300 hover:shadow-md transition-all flex items-center space-x-3">
                        <Icon className="h-5 w-5 text-violet-600" />
                        <span className="font-medium text-gray-700 truncate max-w-[100px]">{label}</span>
                        </div>
                    </DraggableComponent>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-b border-gray-300">
                  <div className="text-xs font-medium text-gray-700 mb-2">UNTERSUCHUNGSAUFTRAG</div>
                  <div className="text-xs text-gray-600">Materialprüfung für Karosserieteile</div>
                </div>

                <div className="p-4">
                  <div className="text-xs font-medium text-gray-700 mb-2">VERANTWORTLICHKEIT</div>
                  <div className="flex items-center mt-2">
                    <input type="radio" className="mr-2" name="responsibility" />
                    <span className="text-xs">Fertigungsbereich</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <input type="radio" className="mr-2" name="responsibility" />
                    <span className="text-xs">Gesamtlieferung</span>
                  </div>

                  {/* Checkbox demo */}
                  <Separator className="my-4" />
                  
                  <div className="text-xs font-medium text-gray-700 mb-2">KONTROLLPUNKTE</div>

                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="responsibility" />
                      <label htmlFor="responsibility" className="text-xs font-medium leading-none">
                        Endmontageprüfung
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="quality-check" />
                      <label htmlFor="quality-check" className="text-xs leading-none">
                        Materialfestigkeitstest
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="packaging" />
                      <label htmlFor="packaging" className="text-xs font-medium leading-none">
                        Korrosionsschutzkontrolle
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox id="logistics" />
                      <label htmlFor="logistics" className="text-xs font-medium leading-none">
                        Sicherheitsprüfung
                      </label>
                    </div>
                  </div>
                </div>
              </div>



                  {/* Main drop zone area */}
            <DropZone onDrop={handleDrop}>
              {components.map((component) => (
                <DroppedComponent
                  key={component.id}
                  id={component.id}
                  left={component.left}
                  top={component.top}
                  type={component.type}
                  text={component.type === "input" ? component.text : undefined}
                  onRemove={handleRemove}
                  onTextChange={
                    component.type === "input"
                      ? (value) => handleInputChange(component.id, value)
                      : undefined
                  }
                />
              ))}
            </DropZone>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-7xl mx-auto border-t border-gray-500 bg-gray-500 text-white p-2 flex justify-between items-center mb-5">
              <div className="text-lg font-bold">
                <Select value={selectedStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-40 bg-transparent text-white font-medium">
                    <SelectValue placeholder="any"/>
                  </SelectTrigger>
                  <SelectContent>
                    {statusLegend.map(({ label }) => (
                      <SelectItem key={label} value={label}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-4 text-xs">
                <div>
                  <div>Erstellt:</div>
                  <div>Max Mustermann</div>
                </div>
                <div>
                  <div>Bauteil:</div>
                  <div>Karosserierahmen</div>
                </div>
                <div>
                  <div>Prüfnummer:</div>
                  <div>CFD-2024-0789</div>
                </div>
                <div>
                  <div>Version:</div>
                  <div>V5.2 - 15.03.2025</div>
                </div>
              </div>

              <div>Folie 8</div>
          </div>


      </div>
    </DndProvider>
  );
};

export default ComponentPage;