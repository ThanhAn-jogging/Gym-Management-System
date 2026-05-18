package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.LopHoc;
import com.mycompany.gymmanagement.service.LopHocService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lophoc")
@CrossOrigin("*")
@RequiredArgsConstructor
public class LopHocController {
    private final LopHocService lopHocService;

    @GetMapping
    public ResponseEntity<List<LopHoc>> layTatCa() {
        return ResponseEntity.ok(lopHocService.layTatCaLopHoc());
    }

    @PostMapping
    public ResponseEntity<String> themLop(@RequestBody LopHoc lop) {
        try {
            lopHocService.themLopHoc(lop);
            return ResponseEntity.ok("Mở lớp học mới thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> suaLop(@PathVariable String id, @RequestBody LopHoc lop) {
        try {
            lopHocService.capNhatLopHoc(id, lop);
            return ResponseEntity.ok("Cập nhật thông tin lớp thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaLop(@PathVariable String id) {
        try {
            lopHocService.xoaLopHoc(id);
            return ResponseEntity.ok("Xóa lớp học thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}