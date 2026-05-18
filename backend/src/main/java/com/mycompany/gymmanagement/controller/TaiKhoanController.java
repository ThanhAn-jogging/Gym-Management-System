package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.TaiKhoan;
import com.mycompany.gymmanagement.service.TaiKhoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/taikhoan")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TaiKhoanController {
    private final TaiKhoanService taiKhoanService;

    @GetMapping
    public ResponseEntity<List<TaiKhoan>> layTatCa() {
        return ResponseEntity.ok(taiKhoanService.layTatCaTaiKhoan());
    }

    @PostMapping("/login")
    public ResponseEntity<?> dangNhap(@RequestBody Map<String, String> credentials) {
        try {
            String tenDN = credentials.get("tenDN");
            String matKhau = credentials.get("matKhau");
            
            TaiKhoan tk = taiKhoanService.dangNhap(tenDN, matKhau);
            
            return ResponseEntity.ok(tk);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<String> themTaiKhoan(@RequestBody TaiKhoan tk) {
        try {
            taiKhoanService.themTaiKhoan(tk);
            return ResponseEntity.ok("Thêm tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatTaiKhoan(@PathVariable String id, @RequestBody TaiKhoan tk) {
        try {
            taiKhoanService.capNhatTaiKhoan(id, tk);
            return ResponseEntity.ok("Cập nhật tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaTaiKhoan(@PathVariable String id) {
        try {
            taiKhoanService.xoaTaiKhoan(id);
            return ResponseEntity.ok("Xóa tài khoản thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}