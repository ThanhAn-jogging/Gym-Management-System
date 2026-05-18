package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.ThietBi;
import com.mycompany.gymmanagement.service.ThietBiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/thietbi")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ThietBiController {
    private final ThietBiService thietBiService;

    @GetMapping
    public ResponseEntity<List<ThietBi>> layTatCa() {
        return ResponseEntity.ok(thietBiService.layTatCaThietBi());
    }

    @PostMapping
    public ResponseEntity<String> themThietBi(@RequestBody ThietBi tb) {
        try {
            thietBiService.themThietBi(tb);
            return ResponseEntity.ok("Thêm thiết bị mới thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> capNhatThietBi(@PathVariable String id, @RequestBody ThietBi tb) {
        try {
            thietBiService.capNhatThietBi(id, tb);
            return ResponseEntity.ok("Cập nhật thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> xoaThietBi(@PathVariable String id) {
        try {
            thietBiService.xoaThietBi(id);
            return ResponseEntity.ok("Xóa thiết bị thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi xóa: " + e.getMessage());
        }
    }
}