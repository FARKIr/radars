"use client";

import { Button } from "@/components/ui/button";
import { RadarZaznam } from "@/data/radary";
import { exportToCSV, exportToJSON, downloadFile } from "@/lib/filtre";
import { FileDown, FileJson } from "lucide-react";
import { toast } from "sonner";

interface ExportTlacidlaProps {
  data: RadarZaznam[];
}

export function ExportTlacidla({ data }: ExportTlacidlaProps) {
  const exportCSV = () => {
    try {
      const csv = exportToCSV(data);
      downloadFile(csv, "radary.csv", "text/csv;charset=utf-8;");
      toast.success(`Exportovaných ${data.length} záznamov do CSV`);
    } catch (error) {
      toast.error("Chyba pri exporte CSV");
    }
  };

  const exportJSON = () => {
    try {
      const json = exportToJSON(data);
      downloadFile(json, "radary.json", "application/json;charset=utf-8;");
      toast.success(`Exportovaných ${data.length} záznamov do JSON`);
    } catch (error) {
      toast.error("Chyba pri exporte JSON");
    }
  };

  return (
    <div className="flex gap-2">
      <Button onClick={exportCSV} variant="outline" className="gap-2">
        <FileDown className="h-4 w-4" />
        Export CSV
      </Button>
      <Button onClick={exportJSON} variant="outline" className="gap-2">
        <FileJson className="h-4 w-4" />
        Export JSON
      </Button>
    </div>
  );
}
