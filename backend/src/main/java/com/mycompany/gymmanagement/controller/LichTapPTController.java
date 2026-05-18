package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.LichTapPT;
import com.mycompany.gymmanagement.service.LichTapPTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lichtap")
@CrossOrigin("*")
@RequiredArgsConstructor
public class LichTapPTController {
    private final LichTapPTService lichTapPTService;

    @GetMapping
    public ResponseEntity<List<LichTapPT>> layLichTap() {
        return ResponseEntity.ok(lichTapPTService.layLichTap());
    }

    @PostMapping
    public ResponseEntity<String> dangKy(@RequestBody LichTapPT lt) {
        try {
            lichTapPTService.dangKyLichTap(lt.getMaHV(), lt.getMaPT(), lt.getNgayTap(), lt.getKhungGio());
            return ResponseEntity.ok("Đã đặt lịch tập với PT thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }

    @DeleteMapping("/{maLich}")
    public ResponseEntity<String> huyLich(@PathVariable String maLich) {
        try {
            lichTapPTService.huyLichTap(maLich);
            return ResponseEntity.ok("Đã hủy lịch tập thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi: " + e.getMessage());
        }
    }
}