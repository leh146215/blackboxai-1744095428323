import { QuanLySIM } from './module_sim.js';
import { AIHelper } from './ai_helper.js';

export class GiaoDienPhone {
  constructor() {
    this.sim = new QuanLySIM();
    this.danhBa = new Map(); // Sử dụng Map để tối ưu hiệu năng
    this.ai = new AIHelper();
    this.cache = new Map();
    this.lastUpdate = Date.now();
  }

  async hienThiManHinhChinh() {
    // Kiểm tra cache trước khi tính toán lại
    if (this.cache.has('mainScreen') && Date.now() - this.lastUpdate < 1000) {
      return this.cache.get('mainScreen');
    }

    const data = {
      soDienThoai: this.sim.soDienThoai,
      tinHieu: await this.sim.kiemTraTinHieu(),
      nhaMang: this.sim.nhaMang,
      trangThai: this.sim.trangThai,
      suggestions: await this.ai.getSuggestions()
    };

    // Lưu vào cache
    this.cache.set('mainScreen', data);
    this.lastUpdate = Date.now();
    return data;
  }

  async themLienHe(ten, soDienThoai) {
    const optimizedContact = {
      id: crypto.randomUUID(),
      ten: await this.ai.optimizeText(ten),
      soDienThoai,
      avatar: await this.ai.generateAvatar(ten),
      lastUpdated: Date.now()
    };
    
    this.danhBa.set(optimizedContact.id, optimizedContact);
    return { 
      status: 'success',
      contact: optimizedContact 
    };
  }

  async goiDien(soDienThoai) {
    try {
      const callData = {
        id: crypto.randomUUID(),
        soGoi: soDienThoai,
        time: new Date().toISOString(),
        encryption: 'AES-256'
      };
      
      await this.sim.goiDien(callData);
      await this.ai.logCall(callData);
      
      return {
        status: 'calling',
        callId: callData.id,
        encryption: callData.encryption
      };
    } catch (error) {
      await this.ai.logError(error);
      throw new Error(`Gọi điện thất bại: ${await this.ai.translateError(error)}`);
    }
  }

  async nhanTin(soDienThoai, tinNhan) {
    try {
      const message = {
        id: crypto.randomUUID(),
        soNhan: soDienThoai,
        noiDung: await this.ai.filterContent(tinNhan),
        time: new Date().toISOString(),
        status: 'sending',
        encryption: 'AES-256'
      };
      
      await this.sim.nhanTin(message);
      return message;
    } catch (error) {
      await this.ai.logError(error);
      throw new Error(`Gửi tin nhắn thất bại: ${await this.ai.translateError(error)}`);
    }
  }

  // Tối ưu hóa hiệu năng
  optimize() {
    // Giải phóng bộ nhớ
    if (this.cache.size > 100) {
      this.cache.clear();
    }
    // Tối ưu database
    this.ai.optimizeDatabase();
  }
}
