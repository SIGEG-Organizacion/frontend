import { saveAs } from 'file-saver'
import { Workbook, TableColumnProperties } from 'exceljs'
import jsPDF from 'jspdf'

// Interfaces para los tipos de reportes
interface ReportFilters {
  companyName?: string
  startDate?: string
  endDate?: string
  forStudents?: boolean
  opportunityUuid?: string
  status?: string
  groupBy?: 'day' | 'month'
  role?: 'student' | 'company' | 'adminLink' | 'vadminTFG'
  validated?: boolean
}

interface BaseReport {
  type: string
  filters: ReportFilters
  generationDate: string
  _id?: string
  __v?: number
}

interface OpportunityNumbersReport extends BaseReport {
  data: Array<{
    date: string
    count: number
  }>
  total: number
}

interface StatusOpportunitiesReport extends BaseReport {
  data: {
    total: number
    average: number
    statusDistribution: Array<{
      status: string
      count: number
      date: string
    }>
    groupBy: 'day' | 'month'
  }
}

interface InterestReport extends BaseReport {
  data: {
    totalOpportunities: number
    totalInterests: number
    avgInterestsPerOpportunity: number
    description: string
    opportunityUuids: string[]
  }
}

interface UserReport extends BaseReport {
  data: {
    totalUsers: number
    users: Array<{
      name: string
      email: string
      role: string
      validated: boolean
      createdAt: string
    }>
  }
}

type ReportData = OpportunityNumbersReport | StatusOpportunitiesReport | InterestReport | UserReport

// Traducciones para campos y filtros
const etiquetaCampo: Record<string, string> = {
  date: 'Fecha',
  period: 'Periodo',
  count: 'Cantidad',
  status: 'Estado',
  totalUsers: 'Total Usuarios',
  opportunity: 'Oportunidad',
  average: 'Promedio',
  totalOpportunities: 'Total Oportunidades',
  totalInterests: 'Total Intereses',
  avgInterestsPerOpportunity: 'Promedio Intereses por Oportunidad',
  description: 'Descripción',
  name: 'Nombre',
  email: 'Email',
  role: 'Rol',
  validated: 'Validado',
  createdAt: 'Fecha de Registro'
}

const etiquetaFiltro: Record<string, string> = {
  companyName: 'Empresa',
  startDate: 'Fecha inicio',
  endDate: 'Fecha fin',
  forStudents: 'Para estudiantes',
  opportunityUuid: 'UUID Oportunidad',
  status: 'Estado',
  groupBy: 'Granularidad',
  role: 'Rol',
  validated: 'Estado de validación'
}

const traduccionGroupBy = { day: 'Diario', month: 'Mensual' }
const traduccionEstados = {
  open: 'Abierta',
  closed: 'Cerrada',
  pending: 'Pendiente'
}

const traduccionRoles = {
  student: 'Estudiante',
  company: 'Empresa',
  adminLink: 'Admin Link',
  vadminTFG: 'Admin TFG'
}

function formatearValor(val: unknown): string {
  if (val === null || val === undefined) return ''
  if (typeof val === 'boolean') return val ? 'Sí' : 'No'
  if (typeof val === 'string') {
    if (traduccionGroupBy[val as keyof typeof traduccionGroupBy]) {
      return traduccionGroupBy[val as keyof typeof traduccionGroupBy]
    }
    if (traduccionEstados[val as keyof typeof traduccionEstados]) {
      return traduccionEstados[val as keyof typeof traduccionEstados]
    }
    if (traduccionRoles[val as keyof typeof traduccionRoles]) {
      return traduccionRoles[val as keyof typeof traduccionRoles]
    }
  }
  if (val instanceof Date) return val.toLocaleDateString('es-ES')
  if (typeof val === 'number') {
    // Formatear números con 2 decimales si tienen decimales
    return Number.isInteger(val) ? val.toString() : val.toFixed(2)
  }
  return String(val)
}

function obtenerCabecera(titulo: string) {
  return {
    titulo,
    fecha: new Date().toLocaleDateString('es-ES')
  }
}

// Genera y descarga PDF en browser
export function exportReportPDFBrowser(reportData: ReportData, filename = 'reporte.pdf') {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  let yPosition = 20

  // Título y fecha
  const cab = obtenerCabecera(reportData.type)
  doc.setFontSize(18)
  doc.text(cab.titulo.toUpperCase(), pageWidth / 2, yPosition, { align: 'center' })
  
  yPosition += 10
  doc.setFontSize(10)
  doc.text(`Fecha de generación: ${reportData.generationDate}`, 20, yPosition)
  
  yPosition += 10

  // Filtros
  doc.setFontSize(12)
  doc.text('Filtros aplicados:', 20, yPosition)
  yPosition += 7

  Object.entries(reportData.filters || {}).forEach(([k, v]) => {
    const texto = `${etiquetaFiltro[k] || k}: ${formatearValor(v)}`
    doc.text(texto, 20, yPosition)
    yPosition += 7
  })

  yPosition += 5

  // Datos
  doc.setFontSize(12)
  doc.text('Datos del informe:', 20, yPosition)
  yPosition += 10

  const rows = Array.isArray(reportData.data) ? reportData.data : [reportData.data]
  if (rows.length) {
    const cols = Object.keys(rows[0])
    const colWidth = (pageWidth - 40) / cols.length

    // Header
    cols.forEach((c, i) => {
      doc.text(
        etiquetaCampo[c] || c,
        20 + i * colWidth,
        yPosition
      )
    })

    yPosition += 7

    // Values
    rows.forEach(row => {
      if (yPosition > doc.internal.pageSize.height - 20) {
        doc.addPage()
        yPosition = 20
      }

      cols.forEach((col, colIndex) => {
        const value = row[col as keyof typeof row]
        doc.text(
          formatearValor(value),
          20 + colIndex * colWidth,
          yPosition
        )
      })
      yPosition += 7
    })
  }

  doc.save(filename)
}

// Genera y descarga Excel en browser
export async function exportReportExcelBrowser(
  reportData: ReportData,
  filename = 'reporte.xlsx'
) {
  const workbook = new Workbook()
  const sheet = workbook.addWorksheet('Reporte')

  // Cabecera
  sheet.mergeCells('A1', 'D1')
  const titleCell = sheet.getCell('A1')
  titleCell.value = reportData.type.toUpperCase()
  titleCell.font = { bold: true, size: 14 }
  
  sheet.getCell('A2').value = `Fecha de generación: ${reportData.generationDate}`

  // Tabla filtros
  const filtRows = Object.entries(reportData.filters || {}).map(([k, v]) => [
    etiquetaFiltro[k] || k,
    formatearValor(v)
  ])

  // Filtros
  if (filtRows.length) {
    sheet.addRow(['Filtros aplicados']).font = { bold: true }
    sheet.addTable({
      name: 'Filtros',
      ref: 'A4',
      headerRow: true,
      columns: [
        { name: 'Filtro', filterButton: true },
        { name: 'Valor', filterButton: true }
      ],
      rows: filtRows,
      style: {
        theme: 'TableStyleMedium2',
        showRowStripes: true
      }
    })
  }

  // Tabla datos
  const rows = Array.isArray(reportData.data) ? reportData.data : [reportData.data]
  if (rows.length) {
    const startRow = 6 + filtRows.length + 1
    sheet.addRow([]).font = { bold: true } // Espacio
    sheet.addRow(['Datos del informe']).font = { bold: true }
    
    const cols: TableColumnProperties[] = Object.keys(rows[0]).map(c => ({
      name: etiquetaCampo[c] || c,
      filterButton: true,
      totalsRowLabel: 'Total',
      totalsRowFunction: 'sum' as const
    }))
    
    const dataRows = rows.map(r => 
      Object.keys(r).map(k => formatearValor(r[k as keyof typeof r]))
    )
    
    sheet.addTable({
      name: 'Datos',
      ref: `A${startRow + 2}`,
      headerRow: true,
      totalsRow: true,
      columns: cols,
      rows: dataRows,
      style: {
        theme: 'TableStyleMedium2',
        showRowStripes: true
      }
    })

    // Ajustar ancho de columnas
    sheet.columns.forEach(column => {
      column.width = Math.max(
        ...dataRows.map(row => {
          const cell = row[sheet.columns.indexOf(column)]
          return cell ? cell.toString().length : 0
        }),
        (column.header || '').length
      ) + 2
    })
  }

  const buf = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  saveAs(blob, filename)
}

// Funciones específicas para cada tipo de reporte
export function exportOpportunityNumbersPDFBrowser(data: OpportunityNumbersReport) {
  return exportReportPDFBrowser(
    { ...data, type: 'NÚMEROS OPORTUNIDADES' },
    'numeros-oportunidades.pdf'
  )
}

export function exportOpportunityStatsPDFBrowser(data: StatusOpportunitiesReport) {
  return exportReportPDFBrowser(
    prepareOpportunityStatsData({ ...data, type: 'ESTADO OPORTUNIDADES' }),
    'estado-oportunidades.pdf'
  )
}

export function exportUserStatsPDFBrowser(data: UserReport) {
  return exportReportPDFBrowser(
    { ...data, type: 'ESTADÍSTICAS USUARIOS' },
    'usuarios.pdf'
  )
}

export function exportInterestNumbersPDFBrowser(data: InterestReport) {
  return exportReportPDFBrowser(
    prepareInterestData({ ...data, type: 'NÚMEROS DE INTERESES' }),
    'intereses.pdf'
  )
}

export function exportOpportunityNumbersExcelBrowser(data: OpportunityNumbersReport) {
  return exportReportExcelBrowser(
    { ...data, type: 'NÚMEROS OPORTUNIDADES' },
    'numeros-oportunidades.xlsx'
  )
}

export function exportOpportunityStatsExcelBrowser(data: StatusOpportunitiesReport) {
  return exportReportExcelBrowser(
    prepareOpportunityStatsData({ ...data, type: 'ESTADO OPORTUNIDADES' }),
    'estado-oportunidades.xlsx'
  )
}

export function exportUserStatsExcelBrowser(data: UserReport) {
  return exportReportExcelBrowser(
    { ...data, type: 'ESTADÍSTICAS USUARIOS' },
    'usuarios.xlsx'
  )
}

export function exportInterestNumbersExcelBrowser(data: InterestReport) {
  return exportReportExcelBrowser(
    prepareInterestData({ ...data, type: 'NÚMEROS DE INTERESES' }),
    'intereses.xlsx'
  )
}

// Función auxiliar para preparar datos de estado de oportunidades
function prepareOpportunityStatsData(report: StatusOpportunitiesReport): OpportunityNumbersReport {
  return {
    ...report,
    data: report.data.statusDistribution.map(item => ({
      date: item.date,
      count: item.count,
      status: item.status
    })),
    total: report.data.total
  } as OpportunityNumbersReport
}

// Función auxiliar para preparar datos de intereses
function prepareInterestData(report: InterestReport): InterestReport {
  const { data, ...rest } = report
  const { opportunityUuids: _, ...cleanData } = data
  return {
    ...rest,
    data: cleanData
  } as InterestReport
}
