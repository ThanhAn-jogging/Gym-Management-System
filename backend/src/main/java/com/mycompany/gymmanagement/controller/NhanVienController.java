package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.NhanVien;
import com.mycompany.gymmanagement.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhanvien")
@CrossOrigin("*")
@RequiredArgsConstructor
public class NhanVienController {

    private final NhanVienService nhanVienService;

    @GetMapping
    public ResponseEntity<List<NhanVien>> layTatCa() {
        return ResponseEntity.ok(nhanVienService.layTatCaNhanVien());
    }

    @PostMapping
    public ResponseEntity<String> themNhanVien(@RequestBody NhanVien nv) {
        try {
            nhanVienService.themNhanVien(nv);
            return ResponseEntity.ok("Thêm nhân viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{maNV}")
    public ResponseEntity<String> capNhat(@PathVariable String maNV, @RequestBody NhanVien nv) {
        try {
            nhanVienService.capNhatNhanVien(maNV, nv);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    @DeleteMapping("/{maNV}")
    public ResponseEntity<String> xoa(@PathVariable String maNV) {
        try {
            nhanVienService.xoaNhanVien(maNV);
            return ResponseEntity.ok("Xóa nhân viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa: " + e.getMessage());
        }
    }

    @GetMapping("/chuc-vu/{tenChucVu}")
    public ResponseEntity<List<NhanVien>> layTheoChucVu(@PathVariable String tenChucVu) {
        return ResponseEntity.ok(nhanVienService.layNhanVienTheoChucVu(tenChucVu));
    }
}