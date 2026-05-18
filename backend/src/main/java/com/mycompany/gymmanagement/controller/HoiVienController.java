package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.HoiVien;
import com.mycompany.gymmanagement.service.HoiVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/hoivien")
@CrossOrigin("*") 
@RequiredArgsConstructor
public class HoiVienController {

    private final HoiVienService hoiVienService;

    @GetMapping
    public ResponseEntity<List<HoiVien>> layTatCaHoiVien() {
        return ResponseEntity.ok(hoiVienService.layTatCaHoiVien());
    }

    @PostMapping
    public ResponseEntity<String> themHoiVien(@RequestBody HoiVien hv) {
        try {
            hoiVienService.themHoiVienMoi(
                hv.getMaHV(), hv.getHoTen(), hv.getGioiTinh(), hv.getNgaySinh(),
                hv.getSdt(), hv.getDiaChi(), hv.getEmail(), hv.getTinhTrangSK()
            );
            return ResponseEntity.ok("Thêm hội viên " + hv.getHoTen() + " thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi khi thêm hội viên: " + e.getMessage());
        }
    }

    @PutMapping("/{maHV}")
    public ResponseEntity<String> capNhat(@PathVariable String maHV, @RequestBody HoiVien hv) {
        try {
            hoiVienService.capNhatHoiVien(maHV, hv);
            return ResponseEntity.ok("Cập nhật hội viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    @DeleteMapping("/{maHV}")
    public ResponseEntity<String> xoa(@PathVariable String maHV) {
        try {
            hoiVienService.xoaHoiVien(maHV);
            return ResponseEntity.ok("Xóa hội viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa hội viên (Có thể đang dính khóa ngoại Hóa đơn/Check-in): " + e.getMessage());
        }
    }
}