package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.DangKyLopHoc;
import com.mycompany.gymmanagement.service.DangKyLopHocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/dangky-lophoc")
@CrossOrigin("*")
@RequiredArgsConstructor
public class DangKyLopHocController {
    private final DangKyLopHocService service;

    @GetMapping
    public ResponseEntity<List<DangKyLopHoc>> getAll() {
        return ResponseEntity.ok(service.layDanhSach());
    }

    @PostMapping
    public ResponseEntity<String> register(@RequestBody DangKyLopHoc dk) {
        try {
            service.dangKy(dk.getMaHV(), dk.getMaLop());
            return ResponseEntity.ok("Ghi danh thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/huy")
    public ResponseEntity<String> cancel(@RequestParam String maHV, @RequestParam String maLop) {
        try {
            service.huy(maHV, maLop);
            return ResponseEntity.ok("Đã hủy ghi danh!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}