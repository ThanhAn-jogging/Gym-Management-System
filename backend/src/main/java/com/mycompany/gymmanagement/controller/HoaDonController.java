package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.HoaDon;
import com.mycompany.gymmanagement.service.HoaDonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/hoadon")
@CrossOrigin("*")
@RequiredArgsConstructor
public class HoaDonController {

    private final HoaDonService hoaDonService;

    @GetMapping
    public ResponseEntity<List<HoaDon>> layTatCaHoaDon() {
        return ResponseEntity.ok(hoaDonService.layTatCaHoaDon());
    }


    @GetMapping("/thongke")
    public ResponseEntity<?> thongKeDoanhThu(@RequestParam Integer thang, @RequestParam Integer nam) {
        try {
            Double doanhThu = hoaDonService.thongKeDoanhThu(thang, nam);
            return ResponseEntity.ok(doanhThu != null ? doanhThu : 0.0);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi thống kê: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<HoaDon> suaHoaDon(@PathVariable String id, @RequestBody HoaDon hd) {
        hd.setMaHD(id);
        return ResponseEntity.ok(hoaDonService.luuHoaDon(hd)); 
    }
}