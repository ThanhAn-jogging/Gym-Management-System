package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.HuanLuyenVien;
import com.mycompany.gymmanagement.service.HuanLuyenVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/huanluyenvien")
@CrossOrigin("*")
@RequiredArgsConstructor
public class HuanLuyenVienController {
    private final HuanLuyenVienService huanLuyenVienService;

    @GetMapping
    public ResponseEntity<List<HuanLuyenVien>> layTatCa() {
        return ResponseEntity.ok(huanLuyenVienService.layTatCaHLV());
    }

    @PostMapping
    public ResponseEntity<String> themHLV(@RequestBody HuanLuyenVien hlv) {
        try {
            huanLuyenVienService.themHLVMoi(hlv);
            return ResponseEntity.ok("Thêm huấn luyện viên thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi thêm HLV: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatHLV(@PathVariable String id, @RequestBody HuanLuyenVien hlv) {
        try {
            hlv.setMaPT(id);
            huanLuyenVienService.capNhatHLV(hlv);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi cập nhật: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaHLV(@PathVariable String id) {
        try {
            huanLuyenVienService.xoaHuanLuyenVien(id);
            return ResponseEntity.ok("Xóa thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa: " + e.getMessage());
        }
    }
}