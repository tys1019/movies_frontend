'use strict';

describe('Movies App', function() {
  it('should pass', function() {
    expect(true).toBe(true);
  });
  it('should be defined', function(){
    expect(App).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.getMovies).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.indexMovies).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.renderMovie).toBeDefined();
  });
  it('should be loaded', function(){
    expect(App.submitMovie).toBeDefined();
  });
});

