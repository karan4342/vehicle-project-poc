// 'use client';

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Card } from "@/components/ui/card";
// import { 
//   Shield, 
//   AlertCircle, 
//   CheckCircle2, 
//   Timer,
//   ArrowLeftRight,
//   Link
// } from "lucide-react";

// export default function Components() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState(0);

//   useEffect(() => {
//     const savedData = localStorage.getItem('projectData');
//     if (!savedData) {
//       router.push('/');
//     }
//   }, []);

//   const data = JSON.parse(localStorage.getItem('projectData') || '{}');

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
//                 <div className="flex gap-4">     
//                     <Shield className="h-8 w-8 text-violet-600" />
//                     <h1 className="text-2xl font-bold text-violet-900">{data.projectName}</h1>
//                 </div>
//               <div className="px-3 py-1 bg-violet-100 text-violet-800 rounded-md font-medium">
//                 {data.partName}
//               </div>
//               <div className="px-3 py-1 text-gray-700 border border-gray-500 rounded-md font-medium flex items-center gap-2">
//                 <ArrowLeftRight className="h-4 w-4" />
//                 <span>{data.styleName}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="max-w-7xl mx-auto pt-6">
//         <div className="flex space-x-2 border-b border-violet-100">
//           {/* {['Current Inspection', 'Historical Data', 'Quality Metrics'].map((tab, index) => ( */}
//           {['Current Inspection'].map((tab, index) => (
//             <button
//               key={index}
//               onClick={() => setActiveTab(index)}
//               className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
//                 activeTab === index 
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
//                         {/* {new Date().toLocaleDateString()} */}
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
//                     className={`
//                       ${index % 2 === 0 ? 'bg-violet-50/30' : 'bg-white'}
//                       hover:bg-violet-50 transition-colors duration-150
//                     `}
//                   >
                    
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-violet-900">
//                       {test.name} 
//                     </td>

//                     <td className="px-6 py-4 text-center">
//                       <div className={`
//                         inline-flex items-center gap-2 px-4 py-2 rounded-md border
//                         transition-all duration-200 cursor-pointer
//                         ${getStatusStyle(test.status)}
//                       `}>
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


'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Card } from "@/components/ui/card";
import { 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  Timer,
  ArrowLeftRight,
  Link as LinkIcon
} from "lucide-react";

export default function Components() {
  const router = useRouter();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('projectData');
    if (!savedData) {
      router.push('/');
    } else {
      setProjectData(JSON.parse(savedData));
    }
  }, [router]);

  // Avoid rendering if projectData is not yet available.
  if (!projectData) return null;

  // Realistic car bonnet inspection data
  const componentTests = [
    { name: "HOOD PANEL SURFACE FLATNESS", status: "i.O", measurement: "0.12mm" },
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
    { name: "HOOD LATCH ENGAGEMENT", status: "i.O", measurement: "PASS" }
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'i.O':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'n.i.O':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'wird berechnet':
        return <Timer className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'i.O':
        return 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100';
      case 'n.i.O':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100';
      case 'wird berechnet':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-violet-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col space-y-4">
              <div className="flex gap-4">     
                <Shield className="h-8 w-8 text-violet-600" />
                <h1 className="text-2xl font-bold text-violet-900">{projectData.projectName}</h1>
              </div>
              <div className="px-3 py-1 bg-violet-100 text-violet-800 rounded-md font-medium">
                {projectData.partName}
              </div>
              <div className="px-3 py-1 text-gray-700 border border-gray-500 rounded-md font-medium flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4" />
                <span>{projectData.styleName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto pt-6">
        <div className="flex space-x-2 border-b border-violet-100">
          {['Current Inspection'].map((tab, index) => (
            <button
              key={index}
              onClick={() => {}}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                index === 0 
                  ? 'bg-violet-100 text-violet-900 border-b-2 border-violet-600' 
                  : 'text-violet-600 hover:bg-violet-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6">
        <Card className="bg-white border-violet-50 rounded-none">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-violet-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-violet-800 uppercase tracking-wider w-64 border-b border-violet-100">
                    Inspection Point
                  </th>
                  {[...Array(6)].map((_, i) => (
                    <th key={i} className="px-6 py-3 text-center text-xs font-medium text-violet-800 uppercase tracking-wider border-b border-violet-100">
                      <div className="border border-violet-200 rounded-md p-2 bg-white shadow-sm">
                        StyleName {i + 1}<br />
                        Date
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-violet-100">
                {componentTests.map((test, index) => (
                  <tr 
                    key={index} 
                    className={`${
                      index % 2 === 0 ? 'bg-violet-50/30' : 'bg-white'
                    } hover:bg-violet-50 transition-colors duration-150`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <NextLink 
                        href={`/components/${encodeURIComponent(test.name)}?data=${encodeURIComponent(JSON.stringify(projectData))}`}
                        className="text-violet-900 hover:underline"
                      >
                        {test.name}
                      </NextLink>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-md border transition-all duration-200 cursor-pointer ${getStatusStyle(test.status)}`}>
                        {getStatusIcon(test.status)}
                        <span>{test.measurement}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}