package com.mycompany.gymmanagement.dto;

import lombok.*;
import java.util.List;

@Data @NoArgsConstructor @AllArgsConstructor
public class DashboardSummaryDTO {
    private Long tongHoiVien;
    private Long checkInHomNay;
    private Double doanhThuThang;
    private String tangTruong;
    private List<ActivityDTO> activities;
    private List<ChartDataDTO> chartData;
    private List<ChartDataDTO> revenueChartData;
    private List<ExpiringMemberDTO> expiringMembers;
    private List<PackageDistDTO> packageDistribution;
    
    private List<RevenueReportDTO> revenueReport;

    public void setRevenueReport(List<RevenueReportDTO> revenueReport) {
        this.revenueReport = revenueReport;
    }
    public List<RevenueReportDTO> getRevenueReport() {
        return this.revenueReport;
    }

    public void setRevenueChartData(List<ChartDataDTO> revenueChartData) {
        this.revenueChartData = revenueChartData;
    }
    public List<ChartDataDTO> getRevenueChartData() {
        return this.revenueChartData;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class RevenueReportDTO {
        private String tenGoi;
        private Long soLuot;
        private Double tongDoanhThu;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ActivityDTO {
        private String tieuDe;
        private String moTa;
        private String thoiGian;
        private String mau;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ChartDataDTO {
        private String name;
        private Long value;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class ExpiringMemberDTO {
        private String hoTen;
        private String sdt;
        private String tenGoi;
        private Integer soNgayConLai;
    }

    @Data @NoArgsConstructor @AllArgsConstructor
    public static class PackageDistDTO {
        private String name;
        private Long value; 
    }
}