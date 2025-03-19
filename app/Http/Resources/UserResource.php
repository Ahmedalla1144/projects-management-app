<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if(Auth::user()->email === 'ahmed.alla56756@gmail.com') {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            ];
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => '***********',
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
        ];
    }
}
