package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.GoiTap;
import com.mycompany.gymmanagement.service.GoiTapService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/goitap")
@CrossOrigin("*") 
@RequiredArgsConstructor
public class GoiTapController {
    private final GoiTapService goiTapService;

    @GetMapping
    public ResponseEntity<List<GoiTap>> layTatCa() {
        return ResponseEntity.ok(goiTapService.layTatCaGoiTap());
    }

    @PostMapping
    public ResponseEntity<String> themGoiTap(@RequestBody GoiTap gt) {
        try {
            goiTapService.themGoiTap(gt);
            return ResponseEntity.ok("Thêm gói tập thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatGoiTap(@PathVariable String id, @RequestBody GoiTap gt) {
        try {
            goiTapService.capNhatGoiTap(id, gt);
            return ResponseEntity.ok("Cập nhật gói tập thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaGoiTap(@PathVariable String id) {
        try {
            goiTapService.xoaGoiTap(id);
            return ResponseEntity.ok("Xóa gói tập thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}