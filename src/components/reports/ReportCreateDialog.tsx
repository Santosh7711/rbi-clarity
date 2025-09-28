import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportName: string;
}

const branches = ["Mumbai Central", "Delhi Main", "Bengaluru Tech Park", "Hyderabad City", "Chennai South"];

const toCSV = (rows: any[]) => {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(","), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? "")).join(","))].join("\n");
  return csv;
};

const download = (filename: string, content: string, type = "text/csv;charset=utf-8;") => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const sampleColumnsFor = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("deposit")) return ["branch", "account_type", "accounts", "balance"];
  if (n.includes("loan") || n.includes("lending")) return ["branch", "loan_type", "accounts", "amount", "npa_flag"];
  if (n.includes("npa")) return ["account_no_masked", "customer_segment", "dpd_bucket", "amount"];
  if (n.includes("aml") || n.includes("kyc") || n.includes("pmla")) return ["customer_id", "risk_rating", "status", "last_updated"];
  if (n.includes("cyber") || n.includes("security")) return ["incident_id", "severity", "system", "status", "reported_at"];
  if (n.includes("digital") || n.includes("upi")) return ["date", "channel", "tx_count", "tx_amount"];
  return ["metric", "value", "notes"]; // generic
};

const sampleRows = (cols: string, branch: string) => {
  const columns = Array.isArray(cols) ? cols : (cols as unknown as string[]);
  const rows = Array.from({ length: 5 }).map((_, i) => {
    const row: Record<string, any> = {};
    columns.forEach((c) => {
      switch (c) {
        case "branch": row[c] = branch; break;
        case "account_type": row[c] = i % 2 ? "Savings" : "Current"; break;
        case "accounts": row[c] = 100 + i * 7; break;
        case "balance": row[c] = 10_00_000 + i * 50_000; break;
        case "loan_type": row[c] = i % 2 ? "MSME" : "Housing"; break;
        case "amount": row[c] = 25_00_000 + i * 1_25_000; break;
        case "npa_flag": row[c] = i % 3 === 0 ? "Y" : "N"; break;
        case "account_no_masked": row[c] = `XXXXXX${(1234 + i).toString()}`; break;
        case "customer_segment": row[c] = i % 2 ? "Retail" : "SME"; break;
        case "dpd_bucket": row[c] = ["0-30", "31-60", "61-90"][i % 3]; break;
        case "customer_id": row[c] = `CUST${1000 + i}`; break;
        case "risk_rating": row[c] = ["Low", "Medium", "High"][i % 3]; break;
        case "status": row[c] = ["Open", "Closed", "In-Progress"][i % 3]; break;
        case "last_updated": row[c] = new Date().toISOString().slice(0,10); break;
        case "incident_id": row[c] = `INC-${2024}${i}`; break;
        case "severity": row[c] = ["Low", "Medium", "High"][i % 3]; break;
        case "system": row[c] = ["Core", "NetBanking", "Mobile"][i % 3]; break;
        case "reported_at": row[c] = new Date(Date.now() - i * 86400000).toISOString(); break;
        case "date": row[c] = new Date(Date.now() - i * 86400000).toISOString().slice(0,10); break;
        case "channel": row[c] = ["UPI", "IMPS", "NEFT", "RTGS"][i % 4]; break;
        case "tx_count": row[c] = 1000 + i * 123; break;
        case "tx_amount": row[c] = 5_00_000 + i * 75_000; break;
        case "metric": row[c] = ["Value A", "Value B", "Value C"][i % 3]; break;
        case "value": row[c] = i * 10; break;
        case "notes": row[c] = "Synthetic sample"; break;
        default: row[c] = "";
      }
    });
    return row;
  });
  return rows;
};

export function ReportCreateDialog({ open, onOpenChange, reportName }: Props) {
  const [frequency, setFrequency] = useState<string>("Monthly");
  const [branch, setBranch] = useState<string>(branches[0]);
  const [period, setPeriod] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const columns = useMemo(() => sampleColumnsFor(reportName), [reportName]);

  const handleGenerate = () => {
    const rows = sampleRows(columns as any, branch);
    const csv = toCSV(rows);
    download(`${reportName.replace(/\s+/g, "_")}_sample.csv`, csv);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create: {reportName}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Frequency</Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">Monthly</SelectItem>
                <SelectItem value="Fortnightly">Fortnightly</SelectItem>
                <SelectItem value="Quarterly">Quarterly</SelectItem>
                <SelectItem value="Annual">Annual</SelectItem>
                <SelectItem value="Ad-hoc">Ad-hoc</SelectItem>
                <SelectItem value="Immediate">Immediate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Reporting Period</Label>
            <Input className="mt-1" placeholder="e.g., 2025-09 or Q1-2025" value={period} onChange={(e) => setPeriod(e.target.value)} />
          </div>
          <div>
            <Label>Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select branch" /></SelectTrigger>
              <SelectContent>
                {branches.map(b => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label>Remarks</Label>
            <Textarea className="mt-1" rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Notes for reviewers..." />
          </div>
        </div>

        <div className="border rounded-md p-3 text-sm">
          <p className="font-medium">Sample Columns</p>
          <p className="text-muted-foreground">{(columns as string[]).join(", ")}</p>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleGenerate}>Generate CSV</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
