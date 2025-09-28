import { useMemo, useState } from "react";
import { REPORT_CATEGORIES } from "@/data/ucbReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReportCreateDialog } from "./ReportCreateDialog";

export function ReportCatalog() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const flat = useMemo(() => {
    return REPORT_CATEGORIES.flatMap((c) => c.items.map((it) => ({ ...it, category: c.label })));
  }, []);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return REPORT_CATEGORIES;
    return REPORT_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter((i) => i.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [query]);

  const handleCreate = (name: string) => {
    setSelected(name);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3 items-center">
        <Input placeholder="Search 175+ UCB reports..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <Badge variant="secondary">{flat.length} reports</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">UCB Report Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredCategories.map((cat) => (
              <AccordionItem key={cat.key} value={cat.key}>
                <AccordionTrigger className="text-left">{cat.label}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {cat.items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between rounded-md border p-3">
                        <div className="min-w-0">
                          <p className="font-medium truncate">{it.name}</p>
                          {it.frequency && <p className="text-xs text-muted-foreground">{it.frequency}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleCreate(it.name)}>Create</Button>
                          <Button size="sm" variant="outline" onClick={() => handleCreate(it.name)}>Quick Generate</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <ReportCreateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        reportName={selected || ""}
      />
    </div>
  );
}
