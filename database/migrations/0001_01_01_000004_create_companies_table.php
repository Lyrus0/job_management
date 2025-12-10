<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('company_name');
            $table->string('domain')->nullable(); // Industry/domain
            $table->text('description')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('website')->nullable();
            $table->string('phone')->nullable();
            $table->string('logo_path')->nullable();
            $table->string('representative_name')->nullable();
            $table->string('representative_position')->nullable();
            $table->integer('company_size')->nullable(); // Number of employees
            $table->year('founded_year')->nullable();
            $table->timestamps();

            $table->index('company_name');
            $table->index('domain');
            $table->index('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
