// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import NextLink from "next/link";
// import { Card } from "@/components/ui/card";
// import { 
//   Shield, 
//   AlertCircle, 
//   CheckCircle2, 
//   Timer,
//   ArrowLeftRight,
//   Link as LinkIcon
// } from "lucide-react";

// export default function Components() {
//   const router = useRouter();
//   const [projectData, setProjectData] = useState(null);

//   useEffect(() => {
//     const savedData = localStorage.getItem('projectData');
//     if (!savedData) {
//       router.push('/');
//     } else {
//       setProjectData(JSON.parse(savedData));
//     }
//   }, [router]);

//   // Avoid rendering if projectData is not yet available.
//   if (!projectData) return null;

//   // Realistic car bonnet inspection data
//   const componentTests = [
//     { name: "HOOD PANEL SURFACE FLATNESS", status: "i.O", measurement: "0.12mm" },
//     { name: "HOOD TO FENDER GAP - LEFT", status: "i.O", measurement: "4.0mm" },
//     { name: "HOOD TO FENDER GAP - RIGHT", status: "i.O", measurement: "4.1mm" },
//     { name: "HOOD TO WINDSHIELD GAP", status: "i.O", measurement: "4.2mm" },
//     { name: "HOOD STRIKER ALIGNMENT", status: "wird berechnet", measurement: "pending" },
//     { name: "PAINT THICKNESS - CENTER", status: "i.O", measurement: "120μm" },
//     { name: "PAINT THICKNESS - EDGES", status: "i.O", measurement: "118μm" },
//     { name: "HOOD HINGE TORQUE - LEFT", status: "i.O", measurement: "8.5Nm" },
//     { name: "HOOD HINGE TORQUE - RIGHT", status: "i.O", measurement: "8.4Nm" },
//     { name: "PEDESTRIAN PROTECTION SYSTEM", status: "i.O", measurement: "PASS" },
//     { name: "HOOD INSULATION ATTACHMENT", status: "i.O", measurement: "100%" },
//     { name: "WATER DRAINAGE TEST", status: "n.i.O", measurement: "FAIL" },
//     { name: "HOOD EMBLEM ALIGNMENT", status: "i.O", measurement: "±0.1mm" },
//     { name: "ANTI-CORROSION COATING", status: "i.O", measurement: "45μm" },
//     { name: "HOOD LATCH ENGAGEMENT", status: "i.O", measurement: "PASS" }
//   ];

//   const getStatusIcon = (status) => {
//     switch(status) {
//       case 'i.O':
//         return <CheckCircle2 className="h-4 w-4 text-green-500" />;
//       case 'n.i.O':
//         return <AlertCircle className="h-4 w-4 text-red-500" />;
//       case 'wird berechnet':
//         return <Timer className="h-4 w-4 text-blue-500" />;
//       default:
//         return null;
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch(status) {
//       case 'i.O':
//         return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
//       case 'n.i.O':
//         return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
//       case 'wird berechnet':
//         return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
//       default:
//         return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
//     }
//   };

//   return (
//     <div className="min-h-screen max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="bg-white border-b border-violet-100">
//         <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col space-y-4">
//               <div className="flex gap-4">     
//                 <Shield className="h-8 w-8 text-violet-600" />
//                 <h1 className="text-2xl font-bold text-violet-900">{projectData.projectName}</h1>
//               </div>
//               <div className="px-3 py-1 bg-violet-100 text-violet-800 rounded-md font-medium">
//                 {projectData.partName}
//               </div>
//               <div className="px-3 py-1 text-gray-700 border border-gray-500 rounded-md font-medium flex items-center gap-2">
//                 <ArrowLeftRight className="h-4 w-4" />
//                 <span>{projectData.styleName}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-7xl mx-auto pt-6">
//         <div className="flex space-x-2 border-b border-violet-100">
//           {['Current Inspection'].map((tab, index) => (
//             <button
//               key={index}
//               onClick={() => {}}
//               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                 index === 0 
//                   ? 'bg-violet-100 text-violet-900 border-b-2 border-violet-600' 
//                   : 'text-violet-600 hover:bg-violet-50'
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-6">
//         <Card className="bg-white border-violet-50 rounded-none">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-violet-50">
//                   <th className="px-6 py-3 text-left text-xs font-medium text-violet-800 uppercase tracking-wider w-64 border-b border-violet-100">
//                     Inspection Point
//                   </th>
//                   {[...Array(6)].map((_, i) => (
//                     <th key={i} className="px-6 py-3 text-center text-xs font-medium text-violet-800 uppercase tracking-wider border-b border-violet-100">
//                       <div className="border border-violet-200 rounded-md p-2 bg-white shadow-sm">
//                         StyleName {i + 1}<br />
//                         Date
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-violet-100">
//                 {componentTests.map((test, index) => (
//                   <tr 
//                     key={index} 
//                     className={`${
//                       index % 2 === 0 ? 'bg-violet-50/30' : 'bg-white'
//                     } hover:bg-violet-50 transition-colors duration-150`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <NextLink 
//                         href={`/components/${encodeURIComponent(test.name)}?data=${encodeURIComponent(JSON.stringify(projectData))}`}
//                         className="text-violet-900 hover:underline"
//                       >
//                         {test.name}
//                       </NextLink>
//                     </td>
//                     <td className="px-6 py-4 text-center">
//                       <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer ${getStatusStyle(test.status)}`}>
//                         {getStatusIcon(test.status)}
//                         <span>{test.measurement}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4"></td>
//                     <td className="px-6 py-4"></td>
//                     <td className="px-6 py-4"></td>
//                     <td className="px-6 py-4"></td>
//                     <td className="px-6 py-4"></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }


// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import NextLink from "next/link"
// import { AlertCircle, CheckCircle2, Timer } from "lucide-react"

// export default function Components() {
//   const router = useRouter()
//   const [projectData, setProjectData] = useState(null)

//   useEffect(() => {
//     const savedData = localStorage.getItem("projectData")
//     if (!savedData) {
//       router.push("/")
//     } else {
//       setProjectData(JSON.parse(savedData))
//     }
//   }, [router])

//   // Avoid rendering if projectData is not yet available.
//   if (!projectData) return null

//   // Realistic car bonnet inspection data
//   const componentTests = [
//     { name: "HOOD PANEL SURFACE FLATNESS", status: "i.O", measurement: "0.12mm" },
//     { name: "HOOD TO FENDER GAP - LEFT", status: "i.O", measurement: "4.0mm" },
//     { name: "HOOD TO FENDER GAP - RIGHT", status: "i.O", measurement: "4.1mm" },
//     { name: "HOOD TO WINDSHIELD GAP", status: "i.O", measurement: "4.2mm" },
//     { name: "HOOD STRIKER ALIGNMENT", status: "wird berechnet", measurement: "pending" },
//     { name: "PAINT THICKNESS - CENTER", status: "i.O", measurement: "120μm" },
//     { name: "PAINT THICKNESS - EDGES", status: "i.O", measurement: "118μm" },
//     { name: "HOOD HINGE TORQUE - LEFT", status: "i.O", measurement: "8.5Nm" },
//     { name: "HOOD HINGE TORQUE - RIGHT", status: "i.O", measurement: "8.4Nm" },
//     { name: "PEDESTRIAN PROTECTION SYSTEM", status: "i.O", measurement: "PASS" },
//     { name: "HOOD INSULATION ATTACHMENT", status: "i.O", measurement: "100%" },
//     { name: "WATER DRAINAGE TEST", status: "n.i.O", measurement: "FAIL" },
//     { name: "HOOD EMBLEM ALIGNMENT", status: "i.O", measurement: "±0.1mm" },
//     { name: "ANTI-CORROSION COATING", status: "i.O", measurement: "45μm" },
//     { name: "HOOD LATCH ENGAGEMENT", status: "i.O", measurement: "PASS" },
//   ]

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "i.O":
//         return <CheckCircle2 className="h-4 w-4 text-green-500" />
//       case "n.i.O":
//         return <AlertCircle className="h-4 w-4 text-red-500" />
//       case "wird berechnet":
//         return <Timer className="h-4 w-4 text-blue-500" />
//       default:
//         return null
//     }
//   }

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "i.O":
//         return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
//       case "n.i.O":
//         return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
//       case "wird berechnet":
//         return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
//       default:
//         return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
//     }
//   }

//   // Status legend items
//   const statusLegend = [
//     { label: "wird berechnet", color: "bg-teal-500" },
//     { label: "n.i.O", color: "bg-red-500" },
//     { label: "nicht bewertet", color: "bg-gray-400" },
//     { label: "nicht für Variante", color: "bg-yellow-400" },
//     { label: "i.O", color: "bg-green-500" },
//     { label: "nicht relevant", color: "bg-gray-300" },
//   ]

//   // Generate dates for the table headers (8 columns)
//   const generateDates = () => {
//     const dates = []
//     for (let i = 0; i < 8; i++) {
//       dates.push(`TT.MM.20${23 + i}`)
//     }
//     return dates
//   }

//   const dates = generateDates()

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="max-w-7xl  mx-auto border-b border-gray-200 bg-violet-100">
//         <div className="mx-auto px-4 py-2">
//           <div className="flex justify-between items-center">
//             <div className="flex flex-col">
//               <div className="text-xl font-bold text-gray-800">BRXXX</div>
//               <div className="text-sm text-gray-600">{projectData.partName || "Stoßfänger vorne"}</div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <div className="flex flex-wrap gap-2 max-w-md">
//                 {statusLegend.map((item, index) => (
//                   <div key={index} className="flex items-center gap-1">
//                     <div
//                       className={`w-24 h-6 ${item.color} text-white text-xs flex items-center justify-center rounded`}
//                     >
//                       {item.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div>
//               {/* AMG Logo placeholder - replace with actual logo */}
//               <div className="text-xl font-bold">AMG</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto">
//         <div className="flex">

//           {/* Table */}
//           <div className="flex-1 overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-white">
//                   <th className="p-2 border border-gray-300 w-64 bg-violet-100"></th>
//                   {dates.map((date, index) => (
//                     <th key={index} className="p-2 border border-gray-300 text-center">
//                       <div className="text-xs font-medium text-gray-700">TASTUNGSSTRAK</div>
//                       <div className="border border-gray-300 rounded bg-white p-1 text-xs mt-1">{date}</div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {componentTests.map((test, index) => (
//                   <tr key={index} className="hover:bg-gray-50 ">
//                     <td className="p-2 border bg-violet-100 border-gray-300 text-xs font-medium text-gray-700 ">
//                       <NextLink
//                         href={`/components/${encodeURIComponent(test.name)}?data=${encodeURIComponent(JSON.stringify(projectData))}`}
//                         className="hover:underline"
//                       >
//                         {test.name}
//                       </NextLink>
//                     </td>
//                     <td className="p-0 border border-gray-300 text-center">
//                       <div
//                         className={`
//                         w-full h-full flex items-center justify-center p-2
//                         ${
//                           test.status === "i.O"
//                             ? "bg-green-100"
//                             : test.status === "n.i.O"
//                               ? "bg-red-100"
//                               : test.status === "wird berechnet"
//                                 ? "bg-teal-100"
//                                 : "bg-gray-100"
//                         }
//                       `}
//                       >
//                         <span className="text-xs">{test.measurement}</span>
//                       </div>
//                     </td>
//                     {/* Empty cells for other dates */}
//                     {[...Array(7)].map((_, i) => (
//                       <td key={i} className="p-0 border border-gray-300"></td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import NextLink from "next/link"
import { AlertCircle, CheckCircle2, Timer } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function Components() {
  const router = useRouter()
  const [projectData, setProjectData] = useState(null)
  const [selectedStatus, setSelectedStatus] = useState("")

  // Car company logos array
  const carLogos1 = [
    "https://www.freepnglogos.com/uploads/car-logo-brands-png-transparent-image-7.png",
    "https://th.bing.com/th/id/R.07ae4184325dfd99725442ec3ac16328?rik=ufJuxjOE7gNJ9w&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fcar-transparent-background%2fcar-transparent-background-22.png&ehk=pHFKR7cFiqlqYImNAsBz8Z7rFcJIT9RgZy4NR%2bm48YU%3d&risl=&pid=ImgRaw&r=0",
  ]
  const carLogos = [
    "https://purepng.com/public/uploads/medium/purepng.com-volvo-car-logologocar-brand-logoscarsvolvo-car-logo-1701527429026thxfh.png",
  ]

  useEffect(() => {
    const savedData = localStorage.getItem("projectData")
    const savedStatus = localStorage.getItem("selectedStatus")
    if (!savedStatus){
      setSelectedStatus("0.12mm")
    } else {
      setSelectedStatus(savedStatus);
    }

    if (!savedData) {
      router.push("/")
    } else {
      setProjectData(JSON.parse(savedData))
    }
  }, [router])

  if (!projectData) return null

  const componentTests = [
    { name: "HOOD PANEL SURFACE FLATNESS", status: "i.O", measurement: `${selectedStatus}` },
    { name: "HOOD TO FENDER GAP - LEFT", status: "i.O", measurement: "4.0mm" },
    { name: "HOOD TO FENDER GAP - RIGHT", status: "i.O", measurement: "4.1mm" },
    { name: "HOOD TO WINDSHIELD GAP", status: "i.O", measurement: "4.2mm" },
    { name: "HOOD STRIKER ALIGNMENT", status: "wird berechnet", measurement: "pending" },
    { name: "PAINT THICKNESS - CENTER", status: "i.O", measurement: "120μm" },
    { name: "PAINT THICKNESS - EDGES", status: "i.O", measurement: "118μm" },
    { name: "HOOD HINGE TORQUE - LEFT", status: "i.O", measurement: "8.5Nm" },
    { name: "HOOD HINGE TORQUE - RIGHT", status: "i.O", measurement: "8.4Nm" },
    { name: "PEDESTRIAN PROTECTION SYSTEM", status: "i.O", measurement: "PASS" },
    { name: "HOOD INSULATION ATTACHMENT", status: "i.O", measurement: "100%" },
    { name: "WATER DRAINAGE TEST", status: "n.i.O", measurement: "FAIL" },
    { name: "HOOD EMBLEM ALIGNMENT", status: "i.O", measurement: "±0.1mm" },
    { name: "ANTI-CORROSION COATING", status: "i.O", measurement: "45μm" },
    { name: "HOOD LATCH ENGAGEMENT", status: "i.O", measurement: "PASS" },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "i.O":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "n.i.O":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "wird berechnet":
        return <Timer className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const statusLegend = [
    { label: "wird berechnet", color: "bg-violet-400" },
    { label: "n.i.O", color: "bg-red-400" },
    { label: "nicht bewertet", color: "bg-violet-300" },
    { label: "nicht für Variante", color: "bg-violet-500" },
    { label: "i.O", color: "bg-green-400" },
    { label: "nicht relevant", color: "bg-violet-200" },
  ]

  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 8; i++) {
      dates.push(`DATE ${i+1}`)
    }
    return dates
  }

  const dates = generateDates()

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-violet-100 max-w-7xl rounded-t-lg mt-5 mx-auto border border-gray-600 border-b-gray-600">
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

            <div className="flex items-center space-x-4">
              <div className="flex space-x-2 my-1">
                {carLogos1.map((logo, index) => (
                  <div key={index} className="w-16 h-16">
                    <Image
                      src={logo}
                      alt={`Car Logo ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex flex-wrap gap-2 max-w-md">
                {statusLegend.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div
                      className={`w-24 h-6 ${item.color} text-white text-xs flex items-center justify-center rounded-md shadow-sm`}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-2 my-1">
                {carLogos.map((logo, index) => (
                  <div key={index} className="w-16 h-16">
                    <Image
                      src={logo}
                      alt={`Car Logo ${index + 1}`}
                      width={60}
                      height={60}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto bg-white overflow-hidden mb-5 rounded-b-lg border border-gray-600">
        <div className="flex">
          <div className="flex-1 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border border-violet-200 w-64 border-r-gray-500 bg-violet-100 text-violet-900"></th>
                  {dates.map((date, index) => (
                    <th key={index} className="p-3 border border-violet-200 text-center bg-violet-50">
                      <div className="text-xs font-medium text-violet-800">
                        {index == 0 ? (projectData.styleName).toUpperCase() : `STYLENAME ${index}`}
                      </div>
                      <div className="border border-violet-200 rounded bg-white p-1 text-xs mt-1 shadow-sm">
                        {date}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {componentTests.map((test, index) => (
                  <tr key={index} className="hover:bg-violet-50 transition-colors duration-150">
                    <td className="p-3 border border-r-gray-500 border-violet-200 bg-violet-100 text-xs font-medium text-violet-900">
                      <NextLink
                        href={`/components/${encodeURIComponent(test.name)}?data=${encodeURIComponent(
                          JSON.stringify(projectData)
                        )}`}
                        className="hover:text-violet-700 hover:underline"
                      >
                        {test.name}
                      </NextLink>
                    </td>
                    <td className="p-0 border border-violet-200 text-center">
                      <div
                        className={`
                        w-full h-full flex items-center justify-center p-2
                        ${
                          test.status === "i.O"
                            ? "bg-green-100"
                            : test.status === "n.i.O"
                            ? "bg-red-100"
                            : test.status === "wird berechnet"
                            ? "bg-violet-100"
                            : "bg-gray-100"
                        }
                      `}
                      >
                        <span className="text-xs font-medium">{test.measurement}</span>
                      </div>
                    </td>
                    {[...Array(7)].map((_, i) => (
                      <td key={i} className="p-0 border border-violet-200"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}