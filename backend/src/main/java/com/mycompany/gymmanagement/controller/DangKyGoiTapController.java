package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.DangKyGoiTap;
import com.mycompany.gymmanagement.service.DangKyGoiTapService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dangky-goitap")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DangKyGoiTapController {
    private final DangKyGoiTapService dangKyGoiTapService;

    @GetMapping
    public ResponseEntity<List<DangKyGoiTap>> layDanhSach() {
        return ResponseEntity.ok(dangKyGoiTapService.layDanhSachDangKy());
    }

    @PostMapping
    public ResponseEntity<String> dangKy(@RequestBody DangKyRequest req) {
        try {
            dangKyGoiTapService.dangKyGoiTap(
                req.getMaHV(), 
                req.getMaGoi(), 
                req.getNgayBatDau(), 
                req.getMaVoucher(), 
                req.getMaNV(), 
                req.getPhuongThucTT()
            );
            return ResponseEntity.ok("Đăng ký gói tập thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable String id, @RequestBody DangKyRequest req) {
        try {
            DangKyGoiTap dk = new DangKyGoiTap();
            dk.setMaHV(req.getMaHV());
            dk.setMaGoi(req.getMaGoi());
            dk.setNgayBatDau(req.getNgayBatDau());
            
            dangKyGoiTapService.capNhat(id, dk, req.getMaVoucher());
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            dangKyGoiTapService.xoa(id);
            return ResponseEntity.ok("Đã xóa đăng ký!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể xóa: " + e.getMessage());
        }
    }
}

@Data
class DangKyRequest {
    private String maHV;
    private String maGoi;
    private LocalDate ngayBatDau;
    private String maVoucher;
    private String maNV;
    private String phuongThucTT;
}