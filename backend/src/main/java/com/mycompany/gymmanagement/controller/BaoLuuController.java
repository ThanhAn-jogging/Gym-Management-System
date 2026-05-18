package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.BaoLuu;
import com.mycompany.gymmanagement.service.BaoLuuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/baoluu")
@CrossOrigin("*")
@RequiredArgsConstructor
public class BaoLuuController {
    private final BaoLuuService baoLuuService;

    @GetMapping
    public ResponseEntity<List<BaoLuu>> layDanhSach() { return ResponseEntity.ok(baoLuuService.layDanhSachBaoLuu()); }

    @PostMapping
    public ResponseEntity<String> them(@RequestBody BaoLuu bl) {
        try { baoLuuService.themBaoLuu(bl); return ResponseEntity.ok("Đã thêm bảo lưu!"); }
        catch (Exception e) { return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage()); }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> sua(@PathVariable("id") String id, @RequestBody BaoLuu bl) {
        try { baoLuuService.suaBaoLuu(id, bl); return ResponseEntity.ok("Đã cập nhật bảo lưu!"); }
        catch (Exception e) { return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage()); }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoa(@PathVariable("id") String id) {
        try { baoLuuService.xoaBaoLuu(id); return ResponseEntity.ok("Đã xóa bảo lưu!"); }
        catch (Exception e) { return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage()); }
    }
}