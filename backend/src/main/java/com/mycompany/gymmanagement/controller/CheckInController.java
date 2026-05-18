package com.mycompany.gymmanagement.controller;

import com.mycompany.gymmanagement.entity.CheckIn;
import com.mycompany.gymmanagement.service.CheckInService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/checkin")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CheckInController {

    private final CheckInService checkInService;

    @GetMapping
    public ResponseEntity<List<CheckIn>> layLichSuCheckIn() {
        return ResponseEntity.ok(checkInService.layLichSuCheckIn());
    }

    @PostMapping("/vao")
    public ResponseEntity<String> checkInVao(@RequestBody CheckIn ci) {
        try {
            checkInService.thucHienCheckIn(ci.getMaCheckIn(), ci.getMaHV(), ci.getMaDK());
            return ResponseEntity.ok("Check-in thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi Check-in: " + e.getMessage());
        }
    }

    @PostMapping("/ra/{maCheckIn}")
    public ResponseEntity<String> checkOutRa(@PathVariable String maCheckIn) {
        try {
            checkInService.thucHienCheckOut(maCheckIn);
            return ResponseEntity.ok("Check-out thành công!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Lỗi Check-out: " + e.getMessage());
        }
    }
}