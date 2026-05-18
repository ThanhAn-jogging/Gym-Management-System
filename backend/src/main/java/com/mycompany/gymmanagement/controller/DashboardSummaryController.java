package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.dto.DashboardSummaryDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DashboardSummaryController {

    private final JdbcTemplate jdbcTemplate;

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummaryDTO> getSummary(
            @RequestParam(required = false, defaultValue = "ALL") String timeFilter) {
        
        DashboardSummaryDTO summary = new DashboardSummaryDTO();
        
        String condHoaDon = "1=1";
        String condHoiVien = "1=1";
        
        if ("MONTH".equals(timeFilter)) {
            condHoaDon = "TO_CHAR(hd.NGAYLAP, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')";
            condHoiVien = "TO_CHAR(NGAYDANGKY, 'MM/YYYY') = TO_CHAR(SYSDATE, 'MM/YYYY')";
        } else if ("YEAR".equals(timeFilter)) {
            condHoaDon = "TO_CHAR(hd.NGAYLAP, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')";
            condHoiVien = "TO_CHAR(NGAYDANGKY, 'YYYY') = TO_CHAR(SYSDATE, 'YYYY')";
        }

        String sqlStats = "SELECT " +
            "(SELECT COUNT(*) FROM HOIVIEN WHERE " + condHoiVien + ") as TONG_HOI_VIEN, " +
            "(SELECT COUNT(*) FROM CHECKIN WHERE TRUNC(THOIGIANVAO) = TRUNC(SYSDATE)) as CHECKIN_HOM_NAY, " +
            "(SELECT NVL(SUM(hd.TONGTIEN), 0) FROM HOADON hd WHERE " + condHoaDon + ") as DOANH_THU_THANG, " +
            "(SELECT TANG_TRUONG FROM VW_DASHBOARD_STATS) as TANG_TRUONG " +
            "FROM DUAL";
            
        jdbcTemplate.query(sqlStats, rs -> {
            summary.setTongHoiVien(rs.getLong("TONG_HOI_VIEN"));
            summary.setCheckInHomNay(rs.getLong("CHECKIN_HOM_NAY"));
            summary.setDoanhThuThang(rs.getDouble("DOANH_THU_THANG"));
            summary.setTangTruong(rs.getString("TANG_TRUONG")); 
        });

        String sqlRevenue = "SELECT NVL(gt.TENGOI, 'TỔNG CỘNG (GRAND TOTAL)') AS TEN_GOI, " +
            "COUNT(dk.MADK) AS SO_LUOT_DANG_KY, SUM(hd.TONGTIEN) AS TONG_DOANH_THU " +
            "FROM HOADON hd JOIN DANGKY_GOITAP dk ON hd.MAHD = dk.MAHD " +
            "JOIN GOITAP gt ON dk.MAGOI = gt.MAGOI " +
            "WHERE " + condHoaDon + " " +
            "GROUP BY ROLLUP(gt.TENGOI)";
            
        summary.setRevenueReport(jdbcTemplate.query(sqlRevenue,
            (rs, i) -> new DashboardSummaryDTO.RevenueReportDTO(
                rs.getString("TEN_GOI"), rs.getLong("SO_LUOT_DANG_KY"), rs.getDouble("TONG_DOANH_THU")
            )
        ));

        summary.setActivities(jdbcTemplate.query(
            "SELECT TIEU_DE, MO_TA, TO_CHAR(THOI_GIAN, 'YYYY-MM-DD HH24:MI:SS') as TG, MAU FROM VW_RECENT_ACTIVITIES",
            (rs, i) -> new DashboardSummaryDTO.ActivityDTO(rs.getString("TIEU_DE"), rs.getString("MO_TA"), rs.getString("TG"), rs.getString("MAU"))
        ));

        summary.setChartData(jdbcTemplate.query(
            "SELECT NAME, VALUE FROM VW_CHART_MEMBER_GROWTH",
            (rs, i) -> new DashboardSummaryDTO.ChartDataDTO(rs.getString("NAME"), rs.getLong("VALUE"))
        ));

        summary.setRevenueChartData(jdbcTemplate.query(
            "SELECT NAME, VALUE FROM VW_CHART_REVENUE_GROWTH",
            (rs, i) -> new DashboardSummaryDTO.ChartDataDTO(rs.getString("NAME"), rs.getLong("VALUE"))
        ));

        summary.setExpiringMembers(jdbcTemplate.query(
            "SELECT HOTEN, SDT, TENGOI, SO_NGAY_CON_LAI FROM VW_EXPIRING_MEMBERS",
            (rs, i) -> new DashboardSummaryDTO.ExpiringMemberDTO(rs.getString("HOTEN"), rs.getString("SDT"), rs.getString("TENGOI"), rs.getInt("SO_NGAY_CON_LAI"))
        ));

        summary.setPackageDistribution(jdbcTemplate.query(
            "SELECT NAME, VALUE FROM VW_PACKAGE_DISTRIBUTION",
            (rs, i) -> new DashboardSummaryDTO.PackageDistDTO(rs.getString("NAME"), rs.getLong("VALUE"))
        ));

        return ResponseEntity.ok(summary);
    }
}