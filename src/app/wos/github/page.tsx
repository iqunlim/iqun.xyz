import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function WOSGithub() {
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ?? "",
    key: process.env.GOOGLE_PRIVATE_KEY ?? "",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID ?? "",
    serviceAccountAuth,
  );

  await doc.loadInfo();
  const sheet = await doc.sheetsByIndex[0].getRows();

  return (
    <div className="m-4 mt-[100px] flex items-center justify-center">
      <Table>
        <TableCaption>{doc.title}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Github Username</TableHead>
            <TableHead>Github Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sheet.map((row, idx) => (
            <TableRow key={row.get("Name") || idx}>
              <TableCell>{row.get("Name")}</TableCell>
              <TableCell>{row.get("Github Username") || "N/A"}</TableCell>
              <TableCell>{row.get("Github Email") || "N/A"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
