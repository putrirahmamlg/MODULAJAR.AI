import { marked } from 'marked';
import { SavedModule } from '../types';

export function exportModuleToWord(module: SavedModule | {
  title: string;
  mataPelajaran: string;
  fase: string;
  kelas: string;
  contentMarkdown: string;
  namaGuru?: string;
  namaSekolah?: string;
  tahunAjaran?: string;
}): void {
  const htmlContent = marked.parse(module.contentMarkdown) as string;

  const headerKop = `
    <div style="text-align: center; border-bottom: 3px double #000; padding-bottom: 12px; margin-bottom: 24px; font-family: 'Arial', sans-serif;">
      <h3 style="margin: 0; font-size: 14pt; text-transform: uppercase;">PEMERINTAH DAERAH DINAS PENDIDIKAN</h3>
      <h2 style="margin: 4px 0; font-size: 16pt; font-weight: bold; text-transform: uppercase;">${module.namaSekolah || 'SATUAN PENDIDIKAN'}</h2>
      <p style="margin: 0; font-size: 10pt; color: #444;">DOKUMEN PERANGKAT AJAR KURIKULUM MERDEKA - TAHUN AJARAN ${module.tahunAjaran || '2025/2026'}</p>
    </div>
  `;

  const signatureBlock = `
    <br><br>
    <table style="width: 100%; border: none; margin-top: 30px; font-family: 'Arial', sans-serif;">
      <tr style="border: none;">
        <td style="width: 50%; border: none; text-align: center; vertical-align: top;">
          <p style="margin: 0;">Mengetahui,<br>Kepala ${module.namaSekolah || 'Satuan Pendidikan'}</p>
          <br><br><br><br>
          <p style="margin: 0; font-weight: bold; text-decoration: underline;">( .................................................... )</p>
          <p style="margin: 0; font-size: 9pt;">NIP. ....................................................</p>
        </td>
        <td style="width: 50%; border: none; text-align: center; vertical-align: top;">
          <p style="margin: 0;">Guru Mata Pelajaran,<br>&nbsp;</p>
          <br><br><br><br>
          <p style="margin: 0; font-weight: bold; text-decoration: underline;">${module.namaGuru || '( .................................................... )'}</p>
          <p style="margin: 0; font-size: 9pt;">NIP. ....................................................</p>
        </td>
      </tr>
    </table>
  `;

  const wordDocumentHtml = `
    <!DOCTYPE html>
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${module.title}</title>
      <style>
        @page {
          size: A4;
          margin: 2.5cm 2cm 2cm 2cm;
        }
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #000000;
        }
        h1 { font-size: 16pt; font-weight: bold; text-align: center; margin-bottom: 8pt; color: #111827; }
        h2 { font-size: 14pt; font-weight: bold; margin-top: 16pt; margin-bottom: 6pt; color: #1e3a8a; border-bottom: 1px solid #cbd5e1; padding-bottom: 2pt; }
        h3 { font-size: 12pt; font-weight: bold; margin-top: 12pt; margin-bottom: 4pt; color: #0f172a; }
        h4 { font-size: 11pt; font-weight: bold; margin-top: 8pt; margin-bottom: 3pt; }
        p { margin-bottom: 6pt; text-align: justify; }
        ul, ol { margin-top: 2pt; margin-bottom: 6pt; padding-left: 24pt; }
        li { margin-bottom: 2pt; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8pt;
          margin-bottom: 12pt;
          font-size: 10pt;
        }
        th {
          border: 1px solid #333333;
          background-color: #f1f5f9;
          font-weight: bold;
          padding: 6pt;
          text-align: left;
        }
        td {
          border: 1px solid #444444;
          padding: 6pt;
          vertical-align: top;
        }
        blockquote {
          border-left: 3pt solid #2563eb;
          padding-left: 10pt;
          font-style: italic;
          background: #f8fafc;
          margin: 8pt 0;
        }
        hr {
          border: none;
          border-top: 1px solid #94a3b8;
          margin: 14pt 0;
        }
      </style>
    </head>
    <body>
      ${headerKop}
      ${htmlContent}
      ${signatureBlock}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', wordDocumentHtml], {
    type: 'application/msword;charset=utf-8'
  });

  const fileName = `${module.title.replace(/[/\\?%*:|"<>]/g, '_')}.doc`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportModuleToText(title: string, markdown: string): void {
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const fileName = `${title.replace(/[/\\?%*:|"<>]/g, '_')}.md`;
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
