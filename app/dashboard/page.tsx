import Documents from "@/components/Documents";
import PlaceholderDocument from "@/components/PlaceholderDocument";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableHead, 
  TableHeader,
  TableRow,
  TableBody,
  TableCaption 
} from "@/components/ui/table";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

function Dashboard() {
  return (
    <div className="h-full max-w-5xl mx-auto ">
      <h1 className="text-[32px] mt-8 font-semibold text-[#353535]">
        Documents
      </h1>
        
      <p className="text-[16px] text-[#858585]">View all your uploaded documents here</p>

      <div className="flex mt-6 gap-4">
        <div className="relative w-full sm:max-w-[30rem]">
          <Search className="absolute w-4 left-3 top-1/2 transform -translate-y-1/2 text-[#555]" />
          <Input
            placeholder="Search..."
            className="w-full px-2 pl-9 py-2 text-[#555] font-medium border border-[#ccc] bg-[#fff] rounded-lg focus:outline-none">
          </Input>
        </div>
        <PlaceholderDocument />
      </div>

      <hr className="mt-8"></hr>
      <div className="mt-6">
        <Table>
          <TableCaption>Nothing more to show here...</TableCaption>
            <TableHeader className="bg-[#eee]">

              <TableRow>
                <TableHead style={{ width: '40rem' }} className="">File Name</TableHead>
                <TableHead style={{ width: '12rem' }} className="">Size</TableHead>
                <TableHead style={{ width: '12rem' }} className="">Upload Date</TableHead>
                <TableHead></TableHead>
              </TableRow>

            </TableHeader>

          <TableBody>
            <Documents />
          </TableBody>
          
        </Table>
      </div>

      
    </div>
  );
}
export default Dashboard;