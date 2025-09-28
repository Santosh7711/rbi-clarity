import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye,
  Settings,
  Type,
  Hash,
  Calendar,
  DollarSign,
  ToggleLeft,
  List,
  FileText,
  Grid3X3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

const ReportBuilder = () => {
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const fieldTypes = [
    { id: "text", label: "Text Input", icon: Type },
    { id: "number", label: "Number", icon: Hash },
    { id: "currency", label: "Currency", icon: DollarSign },
    { id: "date", label: "Date", icon: Calendar },
    { id: "select", label: "Dropdown", icon: List },
    { id: "checkbox", label: "Checkbox", icon: ToggleLeft },
    { id: "textarea", label: "Text Area", icon: FileText },
    { id: "table", label: "Data Table", icon: Grid3X3 },
  ];

  const addField = (type: string) => {
    const newField: FormField = {
      id: `field_${Date.now()}`,
      type,
      label: `New ${type} field`,
      required: false,
      placeholder: type === "text" ? "Enter text..." : undefined,
      options: type === "select" ? ["Option 1", "Option 2"] : undefined,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    const newFields = [...fields];
    const [movedField] = newFields.splice(fromIndex, 1);
    newFields.splice(toIndex, 0, movedField);
    setFields(newFields);
  };

  const handleDragStart = (e: React.DragEvent, fieldId: string) => {
    setDraggedField(fieldId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (!draggedField) return;

    const draggedIndex = fields.findIndex(f => f.id === draggedField);
    if (draggedIndex !== -1) {
      moveField(draggedIndex, targetIndex);
    }
    setDraggedField(null);
  };

  const downloadFile = (filename: string, content: string, type = "text/csv;charset=utf-8;") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateCSVFromFields = () => {
    if (fields.length === 0) {
      toast({ title: "No fields added", description: "Add fields to generate CSV." });
      return;
    }
    const headers = fields.map((f) => (f.label || f.id).replace(/,/g, " "));
    const rows = Array.from({ length: 5 }).map((_, i) =>
      headers.map(() => (i === 0 ? "" : `sample_${i}`)).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const name = reportName || "custom_report";
    downloadFile(`${name.replace(/\s+/g, "_")}.csv`, csv);
  };

  const handleSaveTemplate = () => {
    if (!reportName) {
      toast({ title: "Enter report name", description: "Report name is required to save." });
      return;
    }
    const template = { reportName, reportDescription, fields };
    try {
      const existingRaw = localStorage.getItem("report_builder_templates");
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [
        ...existing.filter((t: any) => t.reportName !== reportName),
        template,
      ];
      localStorage.setItem("report_builder_templates", JSON.stringify(updated));
      toast({ title: "Template saved", description: `Saved ${reportName}` });
    } catch {
      toast({ title: "Save failed", description: "Could not save template." });
    }
  };

  const previewField = (field: FormField) => {
    switch (field.type) {
      case "text":
        return <Input placeholder={field.placeholder} disabled />;
      case "number":
      case "currency":
        return <Input type="number" placeholder="0" disabled />;
      case "date":
        return <Input type="date" disabled />;
      case "select":
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select option..." />
            </SelectTrigger>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Switch disabled />
            <Label>Checkbox option</Label>
          </div>
        );
      case "textarea":
        return <Textarea placeholder="Enter detailed text..." disabled />;
      case "table":
        return (
          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left border-r">S.No</th>
                  <th className="p-2 text-left border-r">Account Number</th>
                  <th className="p-2 text-left border-r">Customer Name</th>
                  <th className="p-2 text-left border-r">Amount (₹)</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="p-2 border-r">1</td>
                  <td className="p-2 border-r">1234567890</td>
                  <td className="p-2 border-r">Sample Customer</td>
                  <td className="p-2 border-r">1,00,000</td>
                  <td className="p-2">Active</td>
                </tr>
                <tr className="border-t bg-muted/20">
                  <td className="p-2 border-r">2</td>
                  <td className="p-2 border-r">0987654321</td>
                  <td className="p-2 border-r">Another Customer</td>
                  <td className="p-2 border-r">2,50,000</td>
                  <td className="p-2">Pending</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2 border-r">3</td>
                  <td className="p-2 border-r">5678901234</td>
                  <td className="p-2 border-r">Third Customer</td>
                  <td className="p-2 border-r">75,000</td>
                  <td className="p-2">Closed</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      default:
        return <Input disabled />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custom Report Builder</h1>
          <p className="text-muted-foreground">
            Design custom RBI compliance reports with drag-and-drop functionality
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSaveTemplate}>
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Field Types Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Field Types</CardTitle>
            <CardDescription>
              Drag fields to build your report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {fieldTypes.map((fieldType) => (
                <Button
                  key={fieldType.id}
                  variant="outline"
                  className="w-full justify-start h-12"
                  onClick={() => addField(fieldType.id)}
                >
                  <fieldType.icon className="mr-3 h-4 w-4" />
                  <span className="text-sm">{fieldType.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Builder */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Report Configuration</CardTitle>
            <CardDescription>
              Configure your custom report template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Report Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="reportName">Report Name</Label>
                <Input
                  id="reportName"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g., Custom Asset Quality Report"
                />
              </div>
              <div>
                <Label htmlFor="reportDescription">Description</Label>
                <Textarea
                  id="reportDescription"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Describe the purpose and scope of this report..."
                />
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Report Fields</h3>
                <Badge variant="secondary">{fields.length} fields</Badge>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    Start building by adding fields from the left panel
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card
                      key={field.id}
                      className="p-4 cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={(e) => handleDragStart(e, field.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{field.type}</Badge>
                            <Switch
                              checked={field.required}
                              onCheckedChange={(checked) => 
                                updateField(field.id, { required: checked })
                              }
                            />
                            <Label className="text-sm">Required</Label>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeField(field.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">Field Label</Label>
                            <Input
                              value={field.label}
                              onChange={(e) => 
                                updateField(field.id, { label: e.target.value })
                              }
                              className="mt-1"
                            />
                          </div>
                          {field.type !== "table" && field.type !== "checkbox" && (
                            <div>
                              <Label className="text-xs">Placeholder</Label>
                              <Input
                                value={field.placeholder || ""}
                                onChange={(e) => 
                                  updateField(field.id, { placeholder: e.target.value })
                                }
                                className="mt-1"
                              />
                            </div>
                          )}
                        </div>

                        {field.type === "select" && (
                          <div>
                            <Label className="text-xs">Options (comma separated)</Label>
                            <Input
                              value={field.options?.join(", ") || ""}
                              onChange={(e) => 
                                updateField(field.id, { 
                                  options: e.target.value.split(", ").filter(o => o.trim()) 
                                })
                              }
                              className="mt-1"
                            />
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Live Preview</CardTitle>
            <CardDescription>
              See how your report will look
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportName && (
                <div>
                  <h3 className="font-semibold">{reportName}</h3>
                  {reportDescription && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {reportDescription}
                    </p>
                  )}
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                {fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label className="text-sm">
                      {field.label}
                      {field.required && <span className="text-destructive ml-1">*</span>}
                    </Label>
                    {previewField(field)}
                  </div>
                ))}
              </div>

              {fields.length > 0 && (
                <div className="pt-4">
                  <div className="grid grid-cols-1 gap-2">
                    <Button className="w-full" onClick={generateCSVFromFields}>
                      Generate CSV
                    </Button>
                    <Button className="w-full" variant="outline" disabled>
                      Submit Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{reportName || "Report Preview"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {reportDescription && (
              <p className="text-sm text-muted-foreground">{reportDescription}</p>
            )}
            <Separator />
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label className="text-sm">
                    {field.label}
                    {field.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {previewField(field)}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReportBuilder;