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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('type', ['stage', 'emploi', 'alternance'])->default('stage');
            $table->enum('status', ['draft', 'active', 'expired', 'closed'])->default('draft');
            $table->string('duration')->nullable(); // e.g., "6 months", "1 year"
            $table->string('location')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->nullable();
            $table->boolean('is_remote')->default(false);
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('salary_currency', 3)->default('EUR');
            $table->enum('salary_period', ['hour', 'month', 'year'])->nullable();
            $table->json('required_skills')->nullable();
            $table->string('education_level')->nullable();
            $table->integer('experience_years')->nullable();
            $table->date('start_date')->nullable();
            $table->date('application_deadline')->nullable();
            $table->integer('positions_available')->default(1);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();

            $table->index('type');
            $table->index('status');
            $table->index('city');
            $table->index('published_at');
            $table->index(['status', 'type']);
            // Note: Add fullText index for MySQL in production:
            // $table->fullText(['title', 'description']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offers');
    }
};
