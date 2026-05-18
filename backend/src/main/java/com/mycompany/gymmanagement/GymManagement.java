package com.mycompany.gymmanagement;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication 
public class GymManagement {

    public static void main(String[] args) {

        SpringApplication.run(GymManagement.class, args);
        System.out.println("=== HE THONG QUAN LY PHONG GYM DA KHOI DONG THANH CONG ===");
    }
}